import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const stats = {
      totalMessages: await ContactMessage.countDocuments(),
      newMessages: await ContactMessage.countDocuments({ status: "new" }),
      repliedMessages: await ContactMessage.countDocuments({
        status: "replied",
      }),
      archivedMessages: await ContactMessage.countDocuments({
        status: "archived",
      }),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
