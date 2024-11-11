interface QuizProgressProps {
    currentQuestion: number;
    totalQuestions: number;
  }
  
  export default function QuizProgress({ currentQuestion, totalQuestions }: QuizProgressProps) {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  
    return (
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>Question {currentQuestion + 1} of {totalQuestions}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }