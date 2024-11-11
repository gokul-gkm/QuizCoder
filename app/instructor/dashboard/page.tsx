"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Quiz } from "@/types";
import Loading from "@/app/components/ui/Loading";
import PageContainer from "@/app/components/common/PageContainer";
import InstructorDashboardHeader from "@/app/components/instructor/dashboard/InstructorDashboardHeader";
import InstructorQuizCard from "@/app/components/instructor/dashboard/InstructorQuizCard";
import InstructorEmptyState from "@/app/components/instructor/dashboard/InstructorEmptyState";
import InstructorErrorState from "@/app/components/instructor/dashboard/InstructorErrorState";
import EditQuizForm from "@/app/components/quiz/EditQuizForm";
import ConfirmBox from "@/app/components/ui/ConfirmBox";
import { toast } from "react-hot-toast";

export default function InstructorDashboard() {
  const { data: session } = useSession();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [deleteQuizId, setDeleteQuizId] = useState<string | null>(null);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch("/api/quiz");
      if (!response.ok) throw new Error("Failed to fetch quizzes");
      const data = await response.json();
      setQuizzes(data);
    } catch (err) {
      setError("Failed to load quizzes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchQuizzes();
    }
  }, [session]);

  const handleDeleteClick = (quizId: string) => {
    setDeleteQuizId(quizId);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteQuizId) return;

    try {
      const response = await fetch(`/api/quiz/${deleteQuizId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete quiz");

      setQuizzes(quizzes.filter((quiz) => quiz._id !== deleteQuizId));
      toast.success("Quiz deleted successfully");
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast.error("Failed to delete quiz");
    } finally {
      setDeleteQuizId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteQuizId(null);
  };

  const handleEditClick = (quiz: Quiz) => {
    setEditingQuiz(quiz);
  };

  const handleEditCancel = () => {
    setEditingQuiz(null);
  };

  const handleEditSave = () => {
    setEditingQuiz(null);
    fetchQuizzes();
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <PageContainer>
        <InstructorErrorState message={error} />
      </PageContainer>
    );
  }

  if (editingQuiz) {
    return (
      <PageContainer>
        <div className="bg-blue-950/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6">
          <EditQuizForm
            quiz={editingQuiz}
            onCancel={handleEditCancel}
            onSave={handleEditSave}
          />
        </div>
      </PageContainer>
    );
  }

  return (
    <>
      <PageContainer>
        <InstructorDashboardHeader
          title="My Quizzes"
          subtitle="Manage and create your coding quizzes"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <InstructorQuizCard
              key={quiz._id}
              quiz={quiz}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>

        {quizzes.length === 0 && <InstructorEmptyState />}
      </PageContainer>

      <ConfirmBox
        isOpen={deleteQuizId !== null}
        title="Delete Quiz"
        message="Are you sure you want to delete this quiz? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  );
}