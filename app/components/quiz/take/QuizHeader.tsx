import QuizTimer from './QuizTimer';
import QuizProgress from './QuizProgress';

interface QuizHeaderProps {
  title: string;
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
}

export default function QuizHeader({
  title,
  currentQuestion,
  totalQuestions,
  timeLeft,
}: QuizHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg font-bold text-white">{title}</h1>
        <QuizTimer timeLeft={timeLeft} />
      </div>
      <QuizProgress
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
      />
    </div>
  );
}