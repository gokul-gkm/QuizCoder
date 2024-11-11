import { FiClock } from "react-icons/fi";

interface QuizTimerProps {
  timeLeft: number;
}

export default function QuizTimer({ timeLeft }: QuizTimerProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeft <= 60;
  
  return (
    <div className={`flex items-center ${isLowTime ? 'text-red-400 animate-pulse' : 'text-gray-400'}`}>
      <FiClock className="w-4 h-4 mr-2" />
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
}