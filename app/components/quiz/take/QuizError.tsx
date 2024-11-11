interface QuizErrorProps {
    message: string;
  }
  
  export default function QuizError({ message }: QuizErrorProps) {
    return (
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 text-center">
          <p className="text-red-200">{message}</p>
        </div>
      </div>
    );
  }