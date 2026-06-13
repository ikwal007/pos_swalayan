import { paginate } from "@/lib/pagination";

export class CategoryService {
  static async getAllCategoriesWithPagination() {
    const result = await paginate(
      () => prisma.categories.findMany(),
      () => prisma.categories.count(),
      {},
    );
    return result;
  }
}
