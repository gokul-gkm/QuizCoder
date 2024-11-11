"use client";

import { useState } from "react";
import { Quiz } from "@/types";
import { validateQuizInput } from "@/lib/validate";
import { toast } from "react-hot-toast";
import EditQuizBasicInfo from "./edit/EditQuizBasicInfo";
import EditQuizQuestion from "./edit/EditQuizQuestion";
import EditQuizActions from "./edit/EditQuizActions";

interface EditQuizFormProps {
  quiz: Quiz;
  onCancel: () => void;
  onSave: () => void;
}

export default function EditQuizForm({
  quiz,
  onCancel,
  onSave,
}: EditQuizFormProps) {
  const [title, setTitle] = useState(quiz.title);
  const [description, setDescription] = useState(quiz.description);
  const [questions, setQuestions] = useState(quiz.questions);
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
      const response = await fetch(`/api/quiz/${quiz._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update quiz");
      }

      toast.success("Quiz updated successfully");
      onSave();
    } catch (err: any) {
      console.error("Update error:", err);
      toast.error("Failed to update quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-4 animate-fade-in"
    >
      <EditQuizBasicInfo
        title={title}
        description={description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
      />

      <EditQuizActions
        onAddQuestion={handleAddQuestion}
        onCancel={onCancel}
        loading={loading}
      />

      <div className="space-y-4">
        {questions.map((question, index) => (
          <EditQuizQuestion
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
  );
}