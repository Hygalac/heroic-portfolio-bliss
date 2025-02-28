
import React from "react";
import { Skill } from "./types";

interface CategoryLabelProps {
  category: string;
  skills: Skill[];
}

const CategoryLabel: React.FC<CategoryLabelProps> = ({ category, skills }) => {
  const categorySkills = skills.filter(s => s.category === category);
  const avgX = categorySkills.reduce((sum, s) => sum + (s.position?.x || 0), 0) / categorySkills.length;
  const avgY = categorySkills.reduce((sum, s) => sum + (s.position?.y || 0), 0) / categorySkills.length;
  
  return (
    <div
      className="absolute z-30 bg-blue-900/20 px-3 py-1 rounded-full text-xs font-bold text-blue-300 border border-blue-800/50"
      style={{
        left: avgX,
        top: avgY - 70, // Moved category labels further from skills
        transform: "translateX(-50%)",
      }}
    >
      {category}
    </div>
  );
};

export default CategoryLabel;
