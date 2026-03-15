import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/client";

/**
 * Seed script untuk mengisi data awal ke database.
 *
 * Script ini akan membuat role-role default yang diperlukan untuk aplikasi POS Swalayan:
 * - admin: Role untuk administrator sistem
 * - kasir: Role untuk kasir yang menangani transaksi
 * - owner: Role untuk pemilik toko
 * - pelanggan: Role untuk pelanggan (opsional, tergantung kebutuhan)
 *
 * Pastikan DATABASE_URL sudah diset di environment variables.
 */

const connectionString = `${process.env.DATABASE_URL}`;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool: Pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

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
 * Fungsi utama untuk menjalankan seeding.
 */
async function main() {
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

/**
 * Menjalankan main function dan menangani error serta cleanup.
 */
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
    console.log("Database connection closed.");
  })
  .catch(async (e) => {
    console.error("Error during seeding:", e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
