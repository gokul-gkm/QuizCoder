import Link from "next/link";
import { FiBookOpen, FiClock, FiArrowRight, FiActivity } from "react-icons/fi";
import { formatDate } from "@/lib/utils";
import Button from "../ui/Button";
import { Quiz, QuizResult } from "@/types";

interface QuizCardProps {
  quiz: Quiz;
  result: QuizResult | null;
  lastAttempt: QuizResult | null;
}

export default function QuizCard({ quiz, result, lastAttempt }: QuizCardProps) {
  return (
    <div className="relative group animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 via-blue-400/20 to-purple-500/20 rounded-2xl -z-10 blur-xl group-hover:blur-2xl transition-all duration-300" />
      <div className="absolute inset-0 bg-blue-900/5 rounded-2xl -z-5" />

      <div className="card backdrop-blur-xl bg-blue-950/10 border border-blue-500/20 group-hover:border-blue-500/30 transition-all duration-300 rounded-2xl h-full shadow-lg shadow-blue-500/5">
        <div className="p-6 space-y-4 flex flex-col h-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-blue-400/5 to-transparent pointer-events-none" />

          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors backdrop-blur-sm">
              <FiBookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                {quiz.title}
              </h2>
              <p className="text-gray-400 text-sm mt-1">{quiz.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-950/30 rounded-lg p-3 backdrop-blur-sm group-hover:bg-blue-900/30 transition-colors border border-blue-500/10">
              <div className="flex items-center text-gray-300">
                <FiBookOpen className="w-4 h-4 mr-2 text-blue-400" />
                <span className="text-sm">{quiz.questions.length} questions</span>
              </div>
            </div>

            <div className="bg-blue-950/30 rounded-lg p-3 backdrop-blur-sm group-hover:bg-blue-900/30 transition-colors border border-blue-500/10">
              <div className="flex items-center text-gray-300">
                <FiActivity className="w-4 h-4 mr-2 text-green-400" />
                <span className="text-sm">
                  {result ? `${result.score}% Best` : "No attempts"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-950/30 rounded-lg p-3 backdrop-blur-sm border border-blue-500/10 group-hover:bg-blue-900/30 transition-colors">
            <div className="flex items-center text-gray-400 text-sm">
              <FiClock className="w-4 h-4 mr-2 text-purple-400" />
              <span>
                {lastAttempt
                  ? `Last attempt: ${formatDate(lastAttempt.completedAt)}`
                  : "No previous attempts"}
              </span>
            </div>
          </div>

          <div className="flex-grow" />

          <div className="relative">
            <Link href={`/student/quiz/${quiz._id}`} className="block">
              <Button className="w-full group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/20">
                <span className="flex items-center justify-center">
                  {result ? "Retake Quiz" : "Start Quiz"}
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>

            {result && (
              <p className="text-xs text-center text-gray-500 mt-2">
                Retake to improve your score
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}