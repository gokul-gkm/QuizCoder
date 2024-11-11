import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "student") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("quiz_results").insertOne({
      quizId: new ObjectId(data.quizId),
      studentId: new ObjectId(session.user.id),
      answers: data.answers,
      score: data.score,
      completedAt: new Date(),
    });

    return NextResponse.json({ id: result.insertedId });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
