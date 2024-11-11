import Button from "../../ui/Button";
import { FiPlus } from "react-icons/fi";

interface EditQuizActionsProps {
  onAddQuestion: () => void;
  onCancel: () => void;
  loading: boolean;
}

export default function EditQuizActions({
  onAddQuestion,
  onCancel,
  loading,
}: EditQuizActionsProps) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-white">Questions</h2>
        <Button type="button" onClick={onAddQuestion} size="sm">
          <FiPlus className="w-4 h-4 mr-1.5" />
          Add Question
        </Button>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} size="sm">
          Cancel
        </Button>
        <Button type="submit" disabled={loading} size="sm">
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </>
  );
}