import { PrismaClient } from "../../../../../prisma/generated";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET /api/categorys/[id] - Get a single category
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const category = await prisma.categories.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          error: "Category not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch category",
      },
      { status: 500 },
    );
  }
}

// PUT /api/categorys/[id] - Update a category
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
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

    const category = await prisma.categories.update({
      where: { id },
      data: {
        name: name.trim(),
      },
    });

    return NextResponse.json({
      success: true,
      data: category,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error("Error updating category:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        {
          success: false,
          error: "Category not found",
        },
        { status: 404 },
      );
    }

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
        error: "Failed to update category",
      },
      { status: 500 },
    );
  }
}

// DELETE /api/categorys/[id] - Delete a category
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    await prisma.categories.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        {
          success: false,
          error: "Category not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete category",
      },
      { status: 500 },
    );
  }
}
