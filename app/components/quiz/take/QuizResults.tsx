import { FiCheck, FiClock, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import Button from '../../ui/Button';
import { Quiz } from '@/types';
import { useRouter } from 'next/navigation';

interface QuizResultsProps {
  quiz: Quiz;
  score: number;
  answers: number[];
  timeLeft: number;
  isTimeUp: boolean;
  onViewDetailedAnswers: () => void;
  onTryAgain: () => void;
}

export default function QuizResults({
  quiz,
  score,
  answers,
  timeLeft,
  isTimeUp,
  onViewDetailedAnswers,
  onTryAgain,
}: QuizResultsProps) {
  const router = useRouter();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <div className="relative overflow-hidden card p-6 animate-scale-up backdrop-blur-sm bg-gray-900/90">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-spin-slow" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-spin-slow" />
        
        <div className="relative text-center space-y-4">
          <div className="animate-slide-down">
            <div className="inline-block bg-gray-900/90 rounded-xl p-4 border border-gray-800 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-2">
                {isTimeUp ? (
                  <span className="flex items-center justify-center gap-2">
                    <FiClock className="text-yellow-400 animate-pulse" />
                    <span className="animate-slide-in-right">Time's Up!</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <div className="relative">
                      <FiCheck className="text-green-400 z-10" />
                      <div className="absolute inset-0 text-green-400 animate-ping opacity-75">
                        <FiCheck />
                      </div>
                    </div>
                    <span className="animate-slide-in-right">Quiz Complete!</span>
                  </span>
                )}
              </h2>
              
              <div className="relative mt-3">
                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
                <div className="relative text-6xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent mb-2 animate-scale-up">
                  {score}%
                </div>
                <div className="text-sm text-gray-300 flex items-center justify-center gap-2 animate-fade-in">
                  <FiCheck className={`${score >= 70 ? 'text-green-400' : 'text-yellow-400'}`} />
                  <span>
                    {answers.filter((answer, index) => 
                      answer === quiz.questions[index].correctOption
                    ).length} out of {quiz.questions.length} questions correct
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 animate-slide-up">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-3 transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {Math.round((answers.filter(a => a !== -1).length / quiz.questions.length) * 100)}%
              </div>
              <div className="text-xs text-gray-400">Completion Rate</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-3 transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {timeLeft === 0 ? '0:00' : formatTime(timeLeft)}
              </div>
              <div className="text-xs text-gray-400">Time Remaining</div>
            </div>
          </div>

          <div className="space-y-2 animate-slide-up">
            <div className="flex justify-center gap-2">
              <Button 
                onClick={onViewDetailedAnswers}
                className="group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
                size="sm"
              >
                <span className="flex items-center">
                  <FiArrowRight className="mr-2 group-hover:translate-x-1 transition-transform" />
                  Review Answers
                </span>
              </Button>
              <Button 
                variant="secondary"
                onClick={onTryAgain}
                className="group"
                size="sm"
              >
                <span className="flex items-center">
                  <FiCheck className="mr-2 group-hover:rotate-12 transition-transform" />
                  Try Again
                </span>
              </Button>
            </div>
            
            <Button 
              variant="secondary"
              onClick={() => router.push('/student/dashboard')}
              className="w-full group"
              size="sm"
            >
              <span className="flex items-center justify-center">
                <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}