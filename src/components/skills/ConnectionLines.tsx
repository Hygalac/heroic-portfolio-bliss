
import React from "react";
import { Skill } from "./types";

interface ConnectionLinesProps {
  skills: Skill[];
  hoveredSkill: string | null;
}

const ConnectionLines: React.FC<ConnectionLinesProps> = ({ skills, hoveredSkill }) => {
  return (
    <svg className="absolute w-full h-full top-0 left-0 z-10 pointer-events-none">
      {skills.map(skill => 
        skill.connections.map(connectionId => {
          const connectedSkill = skills.find(s => s.id === connectionId);
          if (!skill.position || !connectedSkill?.position) return null;
          
          const isHighlighted = 
            hoveredSkill === skill.id || 
            hoveredSkill === connectionId;
          
          return (
            <line
              key={`${skill.id}-${connectionId}`}
              x1={skill.position.x}
              y1={skill.position.y}
              x2={connectedSkill.position.x}
              y2={connectedSkill.position.y}
              className={`transition-all duration-300 ${
                isHighlighted 
                  ? "stroke-blue-400 stroke-[2px] animate-connector-pulse" 
                  : "stroke-blue-600/30 stroke-[1px]"
              }`}
            />
          );
        })
      )}
    </svg>
  );
};

export default ConnectionLines;
