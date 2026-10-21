
import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDatabase();

    const categories = await db
      .collection("category")
      .find({})
      .sort({ id: 1 })
      .project({
        _id: 0,
        id: 1,
        name: 1,
        slug: 1,
        image: 1,
      })
      .toArray();

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("GET CATEGORIES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch categories",
      },
      { status: 500 }
    );
  }
}
