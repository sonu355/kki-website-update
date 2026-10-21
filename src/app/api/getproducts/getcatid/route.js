// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);

//     const category = searchParams.get("category");

//     if (!category) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Category is required",
//         },
//         { status: 400 }
//       );
//     }

//     const [products] = await db.execute(
//       `
//       SELECT
//         p.*,
//         c.name AS categoryName,
//         c.slug AS categorySlug
//       FROM product p
//       LEFT JOIN category c
//         ON p.categoryId = c.id
//       WHERE c.slug = ?
//       ORDER BY p.id DESC
//       `,
//       [category]
//     );

//     return NextResponse.json({
//       success: true,
//       products,
//     });
//   } catch (err) {
//     console.error("GET PRODUCTS BY CATEGORY ERROR:", err);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Error fetching products",
//         error: err.message,
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category is required",
        },
        { status: 400 }
      );
    }

    const database = await getDatabase();

    // Get category using the existing slug.
    const categoryDocument = await database
      .collection("category")
      .findOne({ slug: category });

    // Preserve the old SQL behavior:
    // An unknown category returns an empty products array.
    if (!categoryDocument) {
      return NextResponse.json({
        success: true,
        products: [],
      });
    }

    // The migration preserved MySQL categoryId and id.
    const products = await database
      .collection("product")
      .find({
        categoryId: categoryDocument.id,
      })
      .sort({ id: -1 })
      .toArray();

    // Preserve fields previously returned by the SQL JOIN.
    const formattedProducts = products.map((product) => ({
      ...product,
      categoryName: categoryDocument.name,
      categorySlug: categoryDocument.slug,
    }));

    return NextResponse.json({
      success: true,
      products: formattedProducts,
    });
  } catch (err) {
    console.error(
      "GET PRODUCTS BY CATEGORY ERROR:",
      err
    );

    return NextResponse.json(
      {
        success: false,
        message: "Error fetching products",
      },
      { status: 500 }
    );
  }
}
