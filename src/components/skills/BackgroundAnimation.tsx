
import React from "react";
import { CircuitBoard } from "lucide-react";

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      {Array.from({ length: 20 }).map((_, index) => (
        <CircuitBoard
          key={index}
          className="absolute text-blue-500 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.3 + Math.random() * 0.3,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          size={Math.random() * 30 + 20}
        />
      ))}
    </div>
  );
};

export default BackgroundAnimation;
