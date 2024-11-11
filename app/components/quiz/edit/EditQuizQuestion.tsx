import { FiTrash2 } from "react-icons/fi";

interface EditQuizQuestionProps {
  questionIndex: number;
  question: {
    text: string;
    options: string[];
    correctOption: number;
  };
  onQuestionChange: (index: number, field: string, value: any) => void;
  onOptionChange: (questionIndex: number, optionIndex: number, value: string) => void;
  onRemoveQuestion: (index: number) => void;
}

export default function EditQuizQuestion({
  questionIndex,
  question,
  onQuestionChange,
  onOptionChange,
  onRemoveQuestion,
}: EditQuizQuestionProps) {
  return (
    <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-white">
          Question {questionIndex + 1}
        </h3>
        <button
          type="button"
          onClick={() => onRemoveQuestion(questionIndex)}
          className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-900/20 transition-colors"
        >
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>

      <div>
        <input
          type="text"
          value={question.text}
          onChange={(e) =>
            onQuestionChange(questionIndex, "text", e.target.value)
          }
          className="w-full bg-gray-900/50 border border-gray-800 rounded-lg p-2 text-white text-sm"
          placeholder="Enter your question"
          required
          maxLength={500}
        />
      </div>

      <div className="space-y-2">
        {question.options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex items-center gap-2">
            <input
              type="radio"
              name={`correct-${questionIndex}`}
              checked={question.correctOption === optionIndex}
              onChange={() =>
                onQuestionChange(questionIndex, "correctOption", optionIndex)
              }
              className="w-4 h-4 text-blue-500 border-gray-800 bg-gray-900/50"
              required
            />
            <input
              type="text"
              value={option}
              onChange={(e) =>
                onOptionChange(questionIndex, optionIndex, e.target.value)
              }
              className="flex-1 bg-gray-900/50 border border-gray-800 rounded-lg p-2 text-white text-sm"
              placeholder={`Option ${optionIndex + 1}`}
              required
              maxLength={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
}