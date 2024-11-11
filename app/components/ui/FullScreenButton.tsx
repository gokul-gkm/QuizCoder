"use client";

import { FiMaximize, FiMinimize } from 'react-icons/fi';
import { useFullScreen } from '@/app/hooks/useFullScreen';
import { cn } from '@/lib/utils';

interface FullScreenButtonProps {
  className?: string;
  onFullScreenChange?: (isFullScreen: boolean) => void;
}

export default function FullScreenButton({ 
  className,
  onFullScreenChange 
}: FullScreenButtonProps) {
  const { isSupported, isFullScreen, toggleFullScreen } = useFullScreen();

  if (!isSupported) return null;

  const handleClick = async () => {
    await toggleFullScreen();
    onFullScreenChange?.(isFullScreen);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200",
        "group relative",
        className
      )}
      aria-label={isFullScreen ? 'Exit fullscreen' : 'Enter fullscreen'}
    >
      {isFullScreen ? (
        <FiMinimize className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
      ) : (
        <FiMaximize className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
      )}
      
     
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs
                     bg-gray-900 text-gray-300 rounded opacity-0 group-hover:opacity-100
                     transition-opacity pointer-events-none whitespace-nowrap">
        {isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </span>
    </button>
  );
}