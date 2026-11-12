import { redirect } from 'next/navigation';

export default async function HomeProductIdRedirect({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const query = new URLSearchParams();
  if (resolvedSearchParams) {
    Object.entries(resolvedSearchParams).forEach(([key, val]) => {
      if (typeof val === 'string') {
        query.set(key, val);
      } else if (Array.isArray(val)) {
        val.forEach((v) => query.append(key, v));
      }
    });
  }
  const queryString = query.toString() ? `?${query.toString()}` : '';
  redirect(`/product/${id}${queryString}`);
}
