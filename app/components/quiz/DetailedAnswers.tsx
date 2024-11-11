"use client";

import { Quiz } from "@/types";
import { FiCheck, FiX, FiArrowLeft, FiBookOpen } from "react-icons/fi";
import Button from "../ui/Button";

interface DetailedAnswersProps {
  quiz: Quiz;
  answers: number[];
  onBack: () => void;
}

export default function DetailedAnswers({
  quiz,
  answers,
  onBack,
}: DetailedAnswersProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
      <div className="mb-6 p-4 rounded-xl bg-blue-950/10 backdrop-blur-sm border border-blue-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <FiBookOpen className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              Detailed Answer Review
            </h2>
            <p className="text-gray-400 text-sm">
              Review your answers and see the correct solutions
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {quiz.questions.map((question, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border backdrop-blur-sm ${
              answers[idx] === question.correctOption
                ? "bg-green-900/10 border-green-500/20"
                : "bg-red-900/10 border-red-500/20"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-base font-medium text-white">
                Question {idx + 1}
              </h3>
              {answers[idx] === question.correctOption ? (
                <div className="flex items-center text-green-400 text-sm">
                  <FiCheck className="w-4 h-4 mr-1" />
                  <span>Correct</span>
                </div>
              ) : (
                <div className="flex items-center text-red-400 text-sm">
                  <FiX className="w-4 h-4 mr-1" />
                  <span>Incorrect</span>
                </div>
              )}
            </div>

            <p className="text-gray-200 text-sm mb-3">{question.text}</p>

            <div className="space-y-2">
              {question.options.map((option, optionIdx) => (
                <div
                  key={optionIdx}
                  className={`p-2 rounded-lg ${
                    optionIdx === question.correctOption
                      ? "bg-green-900/20 border border-green-500/20"
                      : optionIdx === answers[idx] &&
                        answers[idx] !== question.correctOption
                      ? "bg-red-900/20 border border-red-500/20"
                      : "bg-blue-950/30 border border-blue-500/10"
                  }`}
                >
                  <div className="flex items-center text-sm">
                    <span className="mr-2 text-gray-400">
                      {String.fromCharCode(65 + optionIdx)}.
                    </span>
                    <span
                      className={`flex-1 ${
                        optionIdx === question.correctOption
                          ? "text-green-200"
                          : optionIdx === answers[idx] &&
                            answers[idx] !== question.correctOption
                          ? "text-red-200"
                          : "text-gray-300"
                      }`}
                    >
                      {option}
                    </span>
                    {optionIdx === question.correctOption && (
                      <FiCheck className="w-4 h-4 text-green-400" />
                    )}
                    {optionIdx === answers[idx] &&
                      answers[idx] !== question.correctOption && (
                        <FiX className="w-4 h-4 text-red-400" />
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          onClick={onBack}
          className="group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
        >
          <span className="flex items-center">
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Results
          </span>
        </Button>
      </div>
    </div>
  );
}
