/**
 * Data role yang akan di-seed ke database.
 */
const categories = [
  { name: "Minuman" },
  { name: "Makanan" },
  { name: "Sembako" },
  { name: "Frozen Food" },
  { name: "Perawatan Tubuh" },
  { name: "Perawatan Bayi" },
  { name: "Perlengkapan Rumah Tangga" },
  { name: "Elektronik" },
  { name: "Alat Tulis" },
  { name: "Rokok" },
];

/**
 * Fungsi utama untuk menjalankan seeding create category.
 */
export async function seedCategories(prisma: any) {
  console.log("Starting category seeding...");

  const createdCategories = [];

  for (const categoryData of categories) {
    const category = await prisma.categories.findFirst({
      where: { name: categoryData.name },
    });

    let savedCategory;

    if (!category) {
      savedCategory = await prisma.categories.create({
        data: categoryData,
      });
    } else {
      savedCategory = category;
    }

    createdCategories.push(savedCategory);

    console.log(`Category created/updated: ${savedCategory.name}`);
  }
  console.log("Seeding completed successfully!");
  console.log(
    "Created roles:",
    createdCategories.map((r) => r.name),
  );
}
