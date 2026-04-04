import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ContentBlock from "@/models/ContentBlock";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const section = searchParams.get("section");

    if (section) {
      const content = await ContentBlock.findOne({ section });
      return NextResponse.json(content || {});
    }

    const allContent = await ContentBlock.find();
    return NextResponse.json(allContent);
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { section, content } = body;

    if (!section) {
      return NextResponse.json(
        { error: "Section required" },
        { status: 400 }
      );
    }

    const updated = await ContentBlock.findOneAndUpdate(
      { section },
      { content, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}
