import { FiActivity } from "react-icons/fi";

interface InstructorErrorStateProps {
  message: string;
}

export default function InstructorErrorState({ message }: InstructorErrorStateProps) {
  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 text-center">
        <FiActivity className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <p className="text-red-200">{message}</p>
      </div>
    </div>
  );
}