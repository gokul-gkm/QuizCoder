interface QuizQuestionProps {
    question: {
      text: string;
      options: string[];
    };
    selectedAnswer: number;
    onAnswerSelect: (index: number) => void;
  }
  
  export default function QuizQuestion({ 
    question, 
    selectedAnswer, 
    onAnswerSelect 
  }: QuizQuestionProps) {
    return (
      <div className="mb-4">
        <h2 className="text-base font-semibold mb-2 text-white">{question.text}</h2>
  
        <div className="space-y-1.5">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              className={`w-full text-left p-2.5 rounded-lg transition-all duration-300 ${
                selectedAnswer === index
                  ? 'bg-blue-600/20 border-blue-500/50 ring-2 ring-blue-500/20'
                  : 'bg-gray-900/50 border border-gray-800 hover:bg-gray-800/50'
              }`}
            >
              <span className="text-xs text-gray-200">{option}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }