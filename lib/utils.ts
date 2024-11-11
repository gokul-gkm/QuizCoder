import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function calculateScore(answers: { correct: boolean }[]): number {
  const correctAnswers = answers.filter((a) => a.correct).length;
  return Math.round((correctAnswers / answers.length) * 100);
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export const validateQuiz = (quiz: any) => {
  const errors: string[] = [];

  if (!quiz.title?.trim()) {
    errors.push("Title is required");
  }

  if (!quiz.questions?.length) {
    errors.push("At least one question is required");
  } else {
    quiz.questions.forEach((question: any, index: number) => {
      if (!question.text?.trim()) {
        errors.push(`Question ${index + 1} text is required`);
      }
      if (!question.options?.length || question.options.length < 2) {
        errors.push(`Question ${index + 1} must have at least 2 options`);
      }
      if (
        question.correctOption === undefined ||
        question.correctOption >= question.options?.length
      ) {
        errors.push(`Question ${index + 1} must have a valid correct option`);
      }
    });
  }

  return errors;
};
