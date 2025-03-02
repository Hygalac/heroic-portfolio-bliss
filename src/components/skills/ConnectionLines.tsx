
import React from "react";
import { Skill } from "./types";

interface ConnectionLinesProps {
  skills: Skill[];
  hoveredSkill: string | null;
}

const ConnectionLines: React.FC<ConnectionLinesProps> = ({ skills, hoveredSkill }) => {
  // For performance with more skills, only show connections for hovered skill
  // or show all connections if no skill is hovered
  const filteredConnections = hoveredSkill 
    ? skills.filter(skill => 
        skill.id === hoveredSkill || 
        skill.connections.includes(hoveredSkill) ||
        (skills.find(s => s.id === hoveredSkill)?.connections.includes(skill.id) ?? false)
      )
    : skills;

  return (
    <svg className="absolute w-full h-full top-0 left-0 z-10 pointer-events-none">
      {filteredConnections.map(skill => 
        skill.connections.map(connectionId => {
          const connectedSkill = skills.find(s => s.id === connectionId);
          if (!skill.position || !connectedSkill?.position) return null;
          
          // Only draw connection if hoveredSkill is related or no skill is hovered
          if (hoveredSkill && skill.id !== hoveredSkill && connectionId !== hoveredSkill) {
            // Check if this connection is indirectly related to hovered skill
            const isIndirectlyConnected = 
              (skills.find(s => s.id === hoveredSkill)?.connections.includes(skill.id) && 
               skills.find(s => s.id === hoveredSkill)?.connections.includes(connectionId)) ||
              (skill.connections.includes(hoveredSkill) && connectedSkill.connections.includes(hoveredSkill));
              
            if (!isIndirectlyConnected) return null;
          }
          
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
