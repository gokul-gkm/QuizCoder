"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateQuizInput } from "@/lib/validate";
import { toast } from "react-hot-toast";
import QuizBasicInfo from "@/app/components/quiz/create/QuizBasicInfo";
import QuizQuestionForm from "@/app/components/quiz/create/QuizQuestionForm";
import QuizFormActions from "@/app/components/quiz/create/QuizFormActions";

interface QuizQuestion {
  text: string;
  options: string[];
  correctOption: number;
}

export default function CreateQuiz() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      text: "",
      options: ["", "", "", ""],
      correctOption: 0,
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        options: ["", "", "", ""],
        correctOption: 0,
      },
    ]);
    toast.success("New question added");
  };

  const handleRemoveQuestion = (index: number) => {
    if (questions.length === 1) {
      toast.error("Quiz must have at least one question");
      return;
    }
    setQuestions(questions.filter((_, i) => i !== index));
    toast.success("Question removed");
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const trimmedQuestions = questions.map((question) => ({
      ...question,
      text: question.text.trim(),
      options: question.options.map((option) => option.trim()),
    }));

    const quizData = {
      title: title.trim(),
      description: description.trim(),
      questions: trimmedQuestions,
    };

    const validationErrors = validateQuizInput(quizData);

    if (validationErrors.length > 0) {
      toast.error(validationErrors[0]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create quiz");
      }

      toast.success("Quiz created successfully");
      router.push("/instructor/dashboard");
    } catch (err: any) {
      console.error("Creation error:", err);
      toast.error("Failed to create quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Create New Quiz</h1>

        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
          <QuizBasicInfo
            title={title}
            description={description}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
          />

          <QuizFormActions
            onAddQuestion={handleAddQuestion}
            onCancel={() => router.push("/instructor/dashboard")}
            loading={loading}
          />

          <div className="space-y-4">
            {questions.map((question, index) => (
              <QuizQuestionForm
                key={index}
                questionIndex={index}
                question={question}
                onQuestionChange={handleQuestionChange}
                onOptionChange={handleOptionChange}
                onRemoveQuestion={handleRemoveQuestion}
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}