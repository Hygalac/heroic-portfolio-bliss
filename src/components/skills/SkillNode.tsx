
import React from "react";
import { Zap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skill } from "./types";

interface SkillNodeProps {
  skill: Skill;
  isVisible: boolean;
  hoveredSkill: string | null;
  onHover: (skillId: string | null) => void;
}

const SkillNode: React.FC<SkillNodeProps> = ({ skill, isVisible, hoveredSkill, onHover }) => {
  if (!skill.position) return null;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 bg-[#001A2C] px-3 py-2 rounded-md border transition-all duration-300 cursor-pointer ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } ${
              hoveredSkill === skill.id
                ? "border-blue-400 shadow-[0_0_15px_rgba(56,189,248,0.6)] scale-110"
                : "border-blue-900/50 hover:border-blue-500"
            }`}
            style={{
              left: skill.position.x,
              top: skill.position.y,
              transitionDelay: `${Math.random() * 0.5}s`,
            }}
            onMouseEnter={() => onHover(skill.id)}
            onMouseLeave={() => onHover(null)}
          >
            <div className="flex items-center gap-2">
              <Zap
                size={16}
                className={`text-blue-400 ${
                  hoveredSkill === skill.id ? "animate-pulse" : ""
                }`}
              />
              <span className="whitespace-nowrap text-sm font-medium text-white">
                {skill.name}
              </span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs bg-[#002A44] text-white border border-blue-500/30 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
          <div>
            <h3 className="font-bold text-blue-300">{skill.name}</h3>
            <p className="text-sm text-gray-300 mt-1">{skill.description}</p>
            <div className="text-xs text-blue-400/80 mt-2">
              Category: {skill.category}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SkillNode;
