// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function GET(req, { params }) {
//   try {
//     const { slug } = await params;
//     const [[product]] = await db.execute(
//       `SELECT p.*, c.name AS categoryName, c.slug AS categorySlug FROM product p
//        LEFT JOIN category c ON p.categoryId = c.id
//        WHERE p.slug = ?`,
//       [slug]
//     );

//     if (!product) {
//       return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
//     }
//     return NextResponse.json({ success: true, product });
//   } catch (err) {
//     console.error("GET PRODUCT BY SLUG ERROR:", err);
//     return NextResponse.json({ success: false, message: "Error fetching product" }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const { slug } = await params;

    const database = await getDatabase();

    // Find the product using its existing URL slug.
    const product = await database
      .collection("product")
      .findOne({ slug });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    // Recreate the category fields from the previous SQL JOIN.
    let categoryName = null;
    let categorySlug = null;

    if (
      product.categoryId !== null &&
      product.categoryId !== undefined
    ) {
      const category = await database
        .collection("category")
        .findOne({ id: product.categoryId });

      if (category) {
        categoryName = category.name;
        categorySlug = category.slug;
      }
    }

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        categoryName,
        categorySlug,
      },
    });
  } catch (err) {
    console.error(
      "GET PRODUCT BY SLUG ERROR:",
      err
    );

    return NextResponse.json(
      {
        success: false,
        message: "Error fetching product",
      },
      { status: 500 }
    );
  }
}
