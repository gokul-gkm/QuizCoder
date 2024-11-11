import { IconType } from "react-icons";

interface PageHeaderProps {
  icon: IconType;
  title: string;
  subtitle: string;
}

export default function PageHeader({ icon: Icon, title, subtitle }: PageHeaderProps) {
  return (
    <div className="relative mb-12 space-y-4">
      <div className="flex items-center gap-3 animate-slide-down">
        <div className="p-3 bg-blue-500/20 rounded-xl backdrop-blur-sm border border-blue-500/20 group-hover:border-blue-500/40 transition-colors">
          <Icon className="w-8 h-8 text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-300 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-gray-400 mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}