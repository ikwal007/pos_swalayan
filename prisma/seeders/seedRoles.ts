/**
 * Data role yang akan di-seed ke database.
 */
const roles = [
  { name: "admin" },
  { name: "kasir" },
  { name: "owner" },
  { name: "pelanggan" },
];

/**
 * Fungsi utama untuk menjalankan seeding create role.
 */
export async function seedRoles(prisma: any) {
  console.log("Starting database seeding...");

  const createdRoles = [];

  for (const roleData of roles) {
    const role = await prisma.roles.upsert({
      where: { name: roleData.name },
      update: {},
      create: roleData,
    });
    createdRoles.push(role);
    console.log(`Role created/updated: ${role.name}`);
  }

  console.log("Seeding completed successfully!");
  console.log(
    "Created roles:",
    createdRoles.map((r) => r.name),
  );
}
