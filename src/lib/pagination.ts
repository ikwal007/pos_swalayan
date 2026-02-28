import type { PaginationOptions } from "@/types/pagination-options.interface";
import type { PaginationResult } from "@/types/pagination-result.interface";

export async function paginate<T>(
  findMany: () => Promise<T[]>,
  count: () => Promise<number>,
  options: PaginationOptions,
): Promise<PaginationResult<T>> {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const total = await count();
  const data = await findMany();
  const lastPage = Math.ceil(total / limit);

  const buildUrl = (pageNum: number) =>
    `${options.route}?page=${pageNum}&limit=${limit}`;

  return {
    data,
    meta: {
      current_page: page,
      per_page: limit,
      total,
      last_page: lastPage,
    },
    links: {
      first: buildUrl(1),
      last: buildUrl(lastPage),
      prev: page > 1 ? buildUrl(page - 1) : null,
      next: page < lastPage ? buildUrl(page + 1) : null,
    },
  };
}
