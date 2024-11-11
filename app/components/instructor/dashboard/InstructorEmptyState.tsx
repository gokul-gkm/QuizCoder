import Link from "next/link";
import { FiActivity, FiPlus } from "react-icons/fi";
import Button from "../../ui/Button";

export default function InstructorEmptyState() {
  return (
    <div className="text-center py-12 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-xl" />
        <div className="relative bg-blue-950/10 backdrop-blur-xl rounded-2xl p-8 max-w-md mx-auto border border-blue-500/20 shadow-lg shadow-black/10">
          <FiActivity className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">No quizzes created yet.</p>
          <Link href="/instructor/create-quiz">
            <Button className="group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400">
              <span className="flex items-center justify-center">
                <FiPlus className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Create Your First Quiz
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}