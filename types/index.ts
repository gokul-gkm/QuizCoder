export interface User {
  id: string;
  name: string;
  email: string;
  role: "instructor" | "student";
  image?: string;
}

export interface Question {
  id?: string;
  text: string;
  options: string[];
  correctOption: number;
}

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  instructorId: string;
  questions: Question[];
  createdAt: Date;
  duration?: number;
  isPublished?: boolean;
}

export interface QuizResult {
  _id: string;
  quizId: string;
  studentId: string;
  answers: {
    questionId: string;
    selectedOption: number;
    correct: boolean;
  }[];
  score: number;
  completedAt: Date;
  timeSpent?: number;
}
