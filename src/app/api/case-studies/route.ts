import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import CaseStudy from "@/models/CaseStudy";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const caseStudies = await CaseStudy.find({ isPublished: true }).sort({
      createdAt: -1,
    });

    return NextResponse.json(caseStudies);
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return NextResponse.json(
      { error: "Failed to fetch case studies" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const caseStudy = await CaseStudy.create({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(caseStudy, { status: 201 });
  } catch (error) {
    console.error("Error creating case study:", error);
    return NextResponse.json(
      { error: "Failed to create case study" },
      { status: 500 }
    );
  }
}
