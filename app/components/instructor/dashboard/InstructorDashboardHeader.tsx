import Link from "next/link";
import { FiLayers, FiPlus } from "react-icons/fi";
import Button from "../../ui/Button";

interface InstructorDashboardHeaderProps {
  title: string;
  subtitle: string;
}

export default function InstructorDashboardHeader({ 
  title, 
  subtitle 
}: InstructorDashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-3 animate-slide-down">
        <div className="p-3 bg-blue-500/20 rounded-xl backdrop-blur-sm border border-blue-500/20">
          <FiLayers className="w-8 h-8 text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-300 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-gray-400 mt-1">{subtitle}</p>
        </div>
      </div>

      <Link href="/instructor/create-quiz">
        <Button className="group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all duration-300">
          <span className="flex items-center">
            <FiPlus className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
            Create New Quiz
          </span>
        </Button>
      </Link>
    </div>
  );
}