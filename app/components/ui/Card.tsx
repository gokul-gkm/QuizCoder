interface CardProps {
  children: React.ReactNode;
  className?: string;
  withHover?: boolean;
}

export default function Card({
  children,
  className = "",
  withHover = true,
}: CardProps) {
  return (
    <div
      className={`
        bg-gray-900/50 backdrop-blur-md 
        border border-gray-800 rounded-xl 
        shadow-xl shadow-black/20
        ${
          withHover
            ? "hover:shadow-2xl hover:shadow-black/30 transition-all duration-300"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}
