
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SplitScreenTransitionProps {
  isActive: boolean;
  targetPath: string;
  originX: number;
  originY: number;
}

const SplitScreenTransition = ({ 
  isActive, 
  targetPath, 
  originX, 
  originY 
}: SplitScreenTransitionProps) => {
  const navigate = useNavigate();
  const [transitionComplete, setTransitionComplete] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Navigate after animation completes
      const timer = setTimeout(() => {
        setTransitionComplete(true);
        navigate(targetPath);
      }, 500); // Match this with the animation duration
      
      return () => clearTimeout(timer);
    }
  }, [isActive, navigate, targetPath]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Left/Top half */}
      <div 
        className="absolute bg-[#010F18] w-1/2 h-full transition-transform duration-500 ease-in-out"
        style={{ 
          transformOrigin: `${originX}px ${originY}px`,
          transform: transitionComplete ? 'translateX(-100%)' : 'translateX(0)',
        }}
      />
      
      {/* Right/Bottom half */}
      <div 
        className="absolute bg-[#010F18] w-1/2 h-full right-0 transition-transform duration-500 ease-in-out"
        style={{ 
          transformOrigin: `${originX}px ${originY}px`,
          transform: transitionComplete ? 'translateX(100%)' : 'translateX(0)',
        }}
      />
    </div>
  );
};

export default SplitScreenTransition;
