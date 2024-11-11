"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Quiz, QuizResult } from "@/types";
import { FiActivity, FiBarChart2 } from "react-icons/fi";
import PageContainer from "@/app/components/common/PageContainer";
import PageHeader from "@/app/components/common/PageHeader";
import QuizCard from "@/app/components/quiz/QuizCard";
import EmptyState from "@/app/components/common/EmptyState";
import Loading from "@/app/components/ui/Loading";

export default function StudentDashboard() {
  const { data: session } = useSession();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quizzesRes, completedRes] = await Promise.all([
          fetch("/api/quiz"),
          fetch("/api/quiz/completed"),
        ]);

        if (!quizzesRes.ok || !completedRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const quizzesData = await quizzesRes.json();
        const completedData = await completedRes.json();

        setQuizzes(quizzesData);
        setCompletedQuizzes(completedData.data);
      } catch (err) {
        setError("Failed to load quizzes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchData();
    }
  }, [session]);

  const getQuizResult = (quizId: string) => {
    const quizAttempts = completedQuizzes.filter(
      (result) => result.quizId === quizId
    );
    if (quizAttempts.length === 0) return null;
    return quizAttempts.reduce((best, current) => {
      return current.score > best.score ? current : best;
    }, quizAttempts[0]);
  };

  const getLastAttempt = (quizId: string) => {
    const quizAttempts = completedQuizzes.filter(
      (result) => result.quizId === quizId
    );
    if (quizAttempts.length === 0) return null;
    return quizAttempts.reduce((latest, current) => {
      return new Date(current.completedAt) > new Date(latest.completedAt)
        ? current
        : latest;
    }, quizAttempts[0]);
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <PageContainer>
        <div className="max-w-md mx-auto p-6">
          <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 text-center">
            <FiBarChart2 className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-200">{error}</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        icon={FiActivity}
        title="Available Quizzes"
        subtitle="Challenge yourself with our latest quizzes"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz._id}
            quiz={quiz}
            result={getQuizResult(quiz._id)}
            lastAttempt={getLastAttempt(quiz._id)}
          />
        ))}
      </div>

      {quizzes.length === 0 && (
        <EmptyState
          icon={FiActivity}
          message="No quizzes available at the moment."
        />
      )}
    </PageContainer>
  );
}