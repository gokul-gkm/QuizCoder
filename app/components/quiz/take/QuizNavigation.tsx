import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi';
import Button from '../../ui/Button';

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  canGoNext: boolean;
  canSubmit: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export default function QuizNavigation({
  currentQuestion,
  totalQuestions,
  canGoNext,
  canSubmit,
  onPrevious,
  onNext,
  onSubmit,
}: QuizNavigationProps) {
  return (
    <div className="flex justify-between">
      <Button
        variant="secondary"
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        className="group"
        size="sm"
      >
        <span className="flex items-center text-xs">
          <FiArrowLeft className="mr-1.5 group-hover:-translate-x-1 transition-transform" />
          Previous
        </span>
      </Button>

      {currentQuestion === totalQuestions - 1 ? (
        <Button
          onClick={onSubmit}
          disabled={!canSubmit}
          className="group"
          size="sm"
        >
          <span className="flex items-center text-xs">
            Submit Quiz
            <FiCheck className="ml-1.5 group-hover:scale-110 transition-transform" />
          </span>
        </Button>
      ) : (
        <Button
          onClick={onNext}
          disabled={!canGoNext}
          className="group"
          size="sm"
        >
          <span className="flex items-center text-xs">
            Next
            <FiArrowRight className="ml-1.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Button>
      )}
    </div>
  );
}