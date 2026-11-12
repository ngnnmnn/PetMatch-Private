import { test, expect } from '@playwright/test';

/**
 * Bộ bài test E2E mẫu cho trang Home (/home) của PetMatch
 * Giúp bạn làm quen với 3 khái niệm cốt lõi của Playwright:
 * 1. page.goto() -> Điều hướng tới trang cần kiểm tra
 * 2. page.getByRole() / page.getByText() -> Tìm phần tử giống cách người dùng nhìn thấy
 * 3. expect(...).toBeVisible() -> Khẳng định trạng thái giao diện trên trình duyệt thật
 */
test.describe('Trang chủ PetMatch (/home)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/home');
  });

  test('1. Hiển thị đầy đủ tiêu đề chính và 3 cổng dịch vụ Bento Box', async ({ page }) => {
    // Kiểm tra tiêu đề Hero xuất hiện
    await expect(
      page.getByRole('heading', { name: /Nơi bé cưng tìm thấy/i }),
    ).toBeVisible();

    // Kiểm tra 3 cổng dịch vụ chính trong khu vực Bento Box
    const bentoSection = page.getByRole('region', {
      name: '3 Cổng dịch vụ chính của PetMatch',
    });
    await expect(bentoSection).toBeVisible();
    await expect(bentoSection.getByRole('link', { name: /Ghép đôi bạn đời/i })).toHaveAttribute(
      'href',
      '/explore',
    );
    await expect(bentoSection.getByRole('link', { name: /Dịch vụ Spa 5 sao/i })).toHaveAttribute(
      'href',
      '/spa',
    );
    await expect(bentoSection.getByRole('link', { name: /Cửa hàng phụ kiện/i })).toHaveAttribute(
      'href',
      '/shop',
    );
  });

  test('2. Tương tác quẹt thẻ Ghép đôi (Pass / Like) trên Hero hoạt động mượt mà', async ({
    page,
  }) => {
    // Ban đầu thẻ hiển thị bé đầu tiên: Milo & Bella
    await expect(page.getByRole('heading', { name: 'Milo & Bella' })).toBeVisible();

    // Bấm nút "Xem bé tiếp theo" (Pass)
    await page.getByRole('button', { name: 'Xem bé tiếp theo' }).click();

    // Sau 240ms thẻ chuyển sang bé thứ hai: Max & Luna
    await expect(page.getByRole('heading', { name: 'Max & Luna' })).toBeVisible();
  });

  test('3. Kiểm tra các liên kết điều hướng và Footer', async ({ page }) => {
    // Kiểm tra nút Giỏ hàng trên Header
    const cartLink = page.getByRole('link', { name: 'Giỏ hàng' });
    await expect(cartLink).toBeVisible();
    await expect(cartLink).toHaveAttribute('href', '/cart');

    // Kiểm tra Footer hiển thị thông tin bản quyền và các liên kết hợp lệ (không có /match 404)
    const footer = page.locator('footer');
    await expect(footer.getByText(/PetMatchAndStore/i)).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Ghép đôi thú cưng' })).toHaveAttribute('href', '/explore');
    await expect(footer.getByRole('link', { name: 'Cửa hàng phụ kiện' })).toHaveAttribute('href', '/shop');
    await expect(footer.getByRole('link', { name: 'Dịch vụ Spa 5 sao' })).toHaveAttribute('href', '/spa');
  });

  test('4. Điều hướng Mobile mở được menu dịch vụ & trang 404 có nút quay lại', async ({ page, isMobile }) => {
    if (isMobile) {
      const toggle = page.getByRole('button', { name: 'Mở menu điều hướng' });
      await expect(toggle).toBeVisible();
      await toggle.click();
      const mobileNav = page.locator('#mobile-nav');
      await expect(mobileNav.getByRole('link', { name: 'Cửa hàng' })).toHaveAttribute('href', '/shop');
      await expect(mobileNav.getByRole('link', { name: 'Spa & Làm đẹp' })).toHaveAttribute('href', '/spa');
      await expect(mobileNav.getByRole('link', { name: 'Khám phá' })).toHaveAttribute('href', '/explore');
    }

    await page.goto('/match');
    await expect(page.getByRole('heading', { name: 'Trang bạn tìm không tồn tại' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Về trang chủ' })).toHaveAttribute('href', '/home');
  });

  test('5. Lọc sản phẩm nổi bật theo tồn kho biến thể & hiển thị Empty State khi hết hàng (W2)', async ({
    page,
  }) => {
    await page.route('**/products/featured*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'prod-variant-stock',
            name: 'Hạt Dinh Dưỡng Biến Thể Còn Hàng',
            brand: 'Royal Canin',
            sellingPrice: 350000,
            stock: 0,
            isActive: true,
            isFeatured: true,
            targetSpecies: 'DOG',
            rating: 4.8,
            reviewCount: 12,
            soldCount: 8,
            imageUrl: '/hero-pets.jpg',
            variants: [
              { id: 'v1', name: 'Túi 2kg', sellingPrice: 350000, stock: 5, isActive: true },
            ],
          },
          {
            id: 'prod-out-of-stock',
            name: 'Sản Phẩm Đã Hết Hàng Hoàn Toàn',
            brand: 'PetCare',
            sellingPrice: 120000,
            stock: 0,
            isActive: true,
            isFeatured: true,
            targetSpecies: 'CAT',
            rating: 4.5,
            reviewCount: 2,
            imageUrl: '/hero-spa.jpg',
            variants: [],
          },
        ]),
      });
    });

    await page.goto('/home');
    const featuredSection = page.getByRole('region', { name: 'Sản phẩm nổi bật' });
    await expect(featuredSection.getByText('Hạt Dinh Dưỡng Biến Thể Còn Hàng')).toBeVisible();
    await expect(featuredSection.getByText('Sản Phẩm Đã Hết Hàng Hoàn Toàn')).toBeHidden();

    // Kiểm tra Empty State khi không có sản phẩm nổi bật nào còn hàng
    await page.route('**/products/featured*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    await page.reload();
    await expect(featuredSection.getByRole('heading', { name: 'Đang cập nhật thêm sản phẩm nổi bật' })).toBeVisible();
    await expect(featuredSection.getByRole('link', { name: 'Khám phá cửa hàng' })).toHaveAttribute('href', '/shop');
  });
});
