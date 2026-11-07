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

    // Kiểm tra Footer hiển thị thông tin bản quyền
    await expect(page.getByText(/PetMatchAndStore/i)).toBeVisible();
  });
});
