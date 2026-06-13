import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/client";
import { seedRoles } from "./seeders/seedRoles";
import { seedCategories } from "./seeders/seedCategories";

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
 * Fungsi utama untuk menjalankan seeding.
 */
async function main() {
  await seedRoles(prisma);
  await seedCategories(prisma);
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
