import { IconType } from "react-icons";

interface EmptyStateProps {
  icon: IconType;
  message: string;
}

export default function EmptyState({ icon: Icon, message }: EmptyStateProps) {
  return (
    <div className="text-center py-12 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-xl" />
        <div className="relative bg-white/[0.05] backdrop-blur-xl rounded-2xl p-8 max-w-md mx-auto border border-white/[0.1] shadow-lg shadow-black/10">
          <Icon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">{message}</p>
        </div>
      </div>
    </div>
  );
}