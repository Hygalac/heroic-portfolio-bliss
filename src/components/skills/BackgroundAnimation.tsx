
import React from "react";
import { CircuitBoard } from "lucide-react";

interface BackgroundAnimationProps {
  opacity?: number;
  color?: string;
  density?: number;
  size?: {
    min: number;
    max: number;
  };
}

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ 
  opacity = 0.1,
  color = "blue",
  density = 20,
  size = { min: 20, max: 50 }
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      {Array.from({ length: density }).map((_, index) => (
        <CircuitBoard
          key={index}
          className={`absolute text-${color}-500 animate-float`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.3 + Math.random() * 0.3,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          size={Math.random() * (size.max - size.min) + size.min}
        />
      ))}
    </div>
  );
};

export default BackgroundAnimation;
