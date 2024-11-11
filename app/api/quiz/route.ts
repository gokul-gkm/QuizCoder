import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { validateQuiz } from "@/lib/utils";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    let quizzes;

    if (session.user.role === "instructor") {
      quizzes = await db
        .collection("quizzes")
        .find({ instructorId: new ObjectId(session.user.id) })
        .sort({ createdAt: -1 })
        .toArray();
    } else {
      quizzes = await db
        .collection("quizzes")
        .aggregate([
          {
            $lookup: {
              from: "users",
              let: { instructorId: "$instructorId" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$_id", { $toObjectId: "$$instructorId" }],
                    },
                  },
                },
              ],
              as: "instructor",
            },
          },
          {
            $unwind: {
              path: "$instructor",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              _id: 1,
              title: 1,
              description: 1,
              createdAt: 1,
              updatedAt: 1,
              questions: 1,
              instructorName: {
                $ifNull: ["$instructor.name", "Unknown Instructor"],
              },
              totalQuestions: { $size: "$questions" },
            },
          },
          {
            $sort: { createdAt: -1 },
          },
        ])
        .toArray();
    }

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return NextResponse.json(
      { error: "Failed to fetch quizzes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "instructor") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const validationErrors = validateQuiz(data);

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: validationErrors.join(", ") },
        { status: 400 }
      );
    }

    const db = await getDb();
    const quiz = {
      ...data,
      instructorId: new ObjectId(session.user.id),
      createdAt: new Date(),
      isPublished: false,
    };

    const result = await db.collection("quizzes").insertOne(quiz);
    return NextResponse.json({
      data: { id: result.insertedId },
    });
  } catch (error) {
    console.error("Error creating quiz:", error);
    return NextResponse.json(
      { error: "Failed to create quiz" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { title, description, questions } = body;

    const db = await getDb();

    const result = await db.collection("quizzes").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          description,
          questions,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating quiz:", error);
    return NextResponse.json(
      { error: "Failed to update quiz" },
      { status: 500 }
    );
  }
}
