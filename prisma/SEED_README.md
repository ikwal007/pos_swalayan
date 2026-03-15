# Database Seeding Documentation

## Overview

File `prisma/seed.ts` digunakan untuk mengisi data awal (seeding) ke dalam database aplikasi POS Swalayan. Script ini akan membuat role-role default yang diperlukan untuk sistem.

## Prerequisites

- Environment variable `DATABASE_URL` harus diset dengan connection string PostgreSQL yang valid.
- Prisma client sudah di-generate (`npx prisma generate`).
- Database sudah di-migrate (`npx prisma migrate dev` atau `npx prisma db push`).

## Roles yang Dibuat

Script ini akan membuat 4 role default:

1. **admin** - Role untuk administrator sistem
   - Memiliki akses penuh ke semua fitur
   - Dapat mengelola pengguna, toko, dan pengaturan sistem

2. **kasir** - Role untuk kasir yang menangani transaksi
   - Dapat memproses penjualan dan pembelian
   - Mengelola inventori dan laporan harian

3. **owner** - Role untuk pemilik toko
   - Akses ke laporan keuangan dan analitik
   - Dapat mengelola produk dan supplier

4. **pelanggan** - Role untuk pelanggan (opsional)
   - Akses terbatas untuk fitur pelanggan
   - Dapat melihat riwayat pembelian

## Cara Menjalankan

### Menggunakan Prisma CLI (Direkomendasikan)

```bash
npx prisma db seed
```

### Menjalankan Manual

```bash
npx tsx prisma/seed.ts
```

## Struktur Kode

- **Import**: Menggunakan Prisma Client dengan adapter PostgreSQL
- **Data Roles**: Array konstan yang berisi role-role yang akan di-seed
- **Main Function**: Loop untuk upsert setiap role
- **Error Handling**: Proper cleanup connection dan exit code

## Fitur

- **Upsert**: Role akan dibuat jika belum ada, atau di-update jika sudah ada
- **Logging**: Menampilkan progress seeding dan hasil akhir
- **Error Handling**: Menangani error dengan proper cleanup
- **Connection Management**: Otomatis disconnect dan close pool

## Troubleshooting

### Error: "DATABASE_URL environment variable is not set"

- Pastikan file `.env` ada dan berisi `DATABASE_URL=postgresql://...`

### Error: "Cannot read properties of undefined (reading 'upsert')"

- Pastikan Prisma client sudah di-generate: `npx prisma generate`
- Periksa schema.prisma untuk memastikan model Roles ada

### Error: "relation 'roles' does not exist"

- Jalankan migration: `npx prisma migrate dev`

### Error TypeScript: "Argument of type 'Pool' is not assignable to parameter of type 'Pool | PoolConfig'"

- Ini adalah konflik versi antara `@types/pg` di project dan yang digunakan oleh `@prisma/adapter-pg`
- Solusi: Type assertion `pool as any` sudah diterapkan di kode
- Atau update dependencies: `npm update @types/pg @prisma/adapter-pg`

### Error: "Module has no default export" atau "Private identifiers are only available when targeting ECMAScript 2015"

- Tambahkan `"skipLibCheck": true` di `tsconfig.json` untuk mengabaikan error dari node_modules
- Atau gunakan TypeScript versi yang kompatibel

## Keamanan

- Script ini hanya membuat data master (roles)
- Tidak membuat user default untuk menghindari security risk
- Pastikan database production tidak di-seed dengan data test

## Pengembangan

Untuk menambah role baru:

1. Tambahkan ke array `roles` di `seed.ts`
2. Jalankan seed script
3. Update dokumentasi jika diperlukan

## Dependencies

- `@prisma/client`: Prisma Client untuk database operations
- `@prisma/adapter-pg`: Adapter untuk PostgreSQL
- `pg`: PostgreSQL driver
- `dotenv`: Environment variable loader</content>
  <parameter name="filePath">prisma/SEED_README.md
