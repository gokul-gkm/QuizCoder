import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "student") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    const results = await db
      .collection("quiz_results")
      .find({
        studentId: new ObjectId(session.user.id),
      })
      .sort({ completedAt: -1 })
      .toArray();

    return NextResponse.json({ data: results });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch completed quizzes" },
      { status: 500 }
    );
  }
}
