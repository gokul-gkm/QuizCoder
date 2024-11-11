import { Quiz } from "@/types";
import { FiBook, FiCalendar, FiEdit2, FiTrash2 } from "react-icons/fi";
import { formatDate } from "@/lib/utils";
import Button from "../../ui/Button";

interface InstructorQuizCardProps {
  quiz: Quiz;
  onEdit: (quiz: Quiz) => void;
  onDelete: (quizId: string) => void;
}

export default function InstructorQuizCard({ quiz, onEdit, onDelete }: InstructorQuizCardProps) {
  return (
    <div className="relative group animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 via-blue-400/20 to-purple-500/20 rounded-2xl -z-10 blur-xl group-hover:blur-2xl transition-all duration-300" />
      <div className="absolute inset-0 bg-blue-900/5 rounded-2xl -z-5" />

      <div className="card backdrop-blur-xl bg-blue-950/10 border border-blue-500/20 group-hover:border-blue-500/30 transition-all duration-300 rounded-2xl h-full shadow-lg shadow-blue-500/5">
        <div className="p-6 space-y-4 flex flex-col h-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-blue-400/5 to-transparent pointer-events-none" />

          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors backdrop-blur-sm">
              <FiBook className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                {quiz.title}
              </h2>
              <p className="text-gray-400 text-sm mt-1">{quiz.description}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-blue-950/30 rounded-lg p-3 backdrop-blur-sm group-hover:bg-blue-900/30 transition-colors border border-blue-500/10">
              <div className="flex items-center text-gray-300">
                <FiBook className="w-4 h-4 mr-2 text-blue-400" />
                <span className="text-sm">{quiz.questions.length} questions</span>
              </div>
            </div>

            <div className="bg-blue-950/30 rounded-lg p-3 backdrop-blur-sm group-hover:bg-blue-900/30 transition-colors border border-blue-500/10">
              <div className="flex items-center text-gray-300">
                <FiCalendar className="w-4 h-4 mr-2 text-purple-400" />
                <span className="text-sm">Created: {formatDate(quiz.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="flex-grow" />

          <div className="flex justify-between items-center gap-3 pt-4">
            <Button
              variant="secondary"
              size="sm"
              className="group flex-1 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20"
              onClick={() => onEdit(quiz)}
            >
              <span className="flex items-center justify-center">
                <FiEdit2 className="mr-2 group-hover:rotate-12 transition-transform" />
                Edit
              </span>
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(quiz._id)}
              className="group flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20"
            >
              <span className="flex items-center justify-center">
                <FiTrash2 className="mr-2 group-hover:rotate-12 transition-transform" />
                Delete
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}