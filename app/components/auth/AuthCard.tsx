interface AuthCardProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
  }
  
  export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">{title}</h2>
            <p className="mt-2 text-gray-400">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    );
  }