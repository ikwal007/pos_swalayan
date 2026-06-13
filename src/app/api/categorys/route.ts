import { PrismaClient, type Categories } from "../../../../prisma/generated";
import { NextRequest, NextResponse } from "next/server";
import type { WebResponse } from "@/types/web.model";
import type { PaginationResult } from "@/types/pagination-result.interface";

const prisma = new PrismaClient();

// GET /api/categorys - Get all categories
export async function GET(): Promise<
  WebResponse<PaginationResult<Categories>>
> {
  try {
    const categories = await prisma.categories.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch categories",
      },
      { status: 500 },
    );
  }
}

// POST /api/categorys - Create a new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          error: "Category name is required and must be a non-empty string",
        },
        { status: 400 },
      );
    }

    const category = await prisma.categories.create({
      data: {
        name: name.trim(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: category,
        message: "Category created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating category:", error);

    // Handle unique constraint violation
    if (error.code === "P2002") {
      return NextResponse.json(
        {
          success: false,
          error: "Category name already exists",
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create category",
      },
      { status: 500 },
    );
  }
}

// PUT /api/categorys/[id] - Update a category (handled in dynamic route)
// DELETE /api/categorys/[id] - Delete a category (handled in dynamic route)
