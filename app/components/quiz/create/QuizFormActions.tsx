import Button from "../../ui/Button";
import { FiPlus } from "react-icons/fi";

interface QuizFormActionsProps {
  onAddQuestion: () => void;
  onCancel: () => void;
  loading: boolean;
}

export default function QuizFormActions({
  onAddQuestion,
  onCancel,
  loading,
}: QuizFormActionsProps) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-white">Questions</h2>
        <Button type="button" onClick={onAddQuestion} size="sm">
          <FiPlus className="w-4 h-4 mr-1.5" />
          Add Question
        </Button>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          size="sm"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading} size="sm">
          {loading ? "Creating..." : "Create Quiz"}
        </Button>
      </div>
    </>
  );
}