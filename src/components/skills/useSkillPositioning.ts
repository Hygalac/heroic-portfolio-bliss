import { useState, useEffect } from "react";
import { Skill } from "./types";

interface UseSkillPositioningProps {
  skills: Skill[];
  windowSize: { width: number; height: number };
}

export const useSkillPositioning = ({ skills: initialSkills, windowSize }: UseSkillPositioningProps) => {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);

  useEffect(() => {
    if (windowSize.width === 0 || windowSize.height === 0) return;
    
    // Add safety margins to ensure skills stay within boundaries
    const safetyMargin = 100; // pixels from the edge
    const effectiveWidth = windowSize.width - (safetyMargin * 2);
    const effectiveHeight = windowSize.height - (safetyMargin * 2);
    
    // Group skills by category for clustered positioning
    const categories = Array.from(new Set(initialSkills.map(skill => skill.category)));
    const categoryPositions: Record<string, { x: number, y: number }> = {};
    
    // Assign a center point for each category with controlled spread
    categories.forEach((category, index) => {
      const angle = (index / categories.length) * 2 * Math.PI;
      // Adjusted radius to keep categories within boundaries
      const radius = Math.min(effectiveWidth, effectiveHeight) * 0.3;
      categoryPositions[category] = {
        x: (windowSize.width / 2) + radius * Math.cos(angle),
        y: (windowSize.height / 2) + radius * Math.sin(angle),
      };
    });
    
    // Position skills around their category center with controlled spacing
    const updatedSkills = initialSkills.map(skill => {
      const categoryCenter = categoryPositions[skill.category];
      const skillsInCategory = initialSkills.filter(s => s.category === skill.category).length;
      const indexInCategory = initialSkills.filter(s => s.category === skill.category).findIndex(s => s.id === skill.id);
      const angle = (indexInCategory / skillsInCategory) * 2 * Math.PI;
      
      // Adjust radius based on number of skills in category to prevent overcrowding
      const baseRadius = 120;
      const radius = Math.min(baseRadius, baseRadius * Math.sqrt(skillsInCategory / 5));
      
      // Calculate position
      let x = categoryCenter.x + radius * Math.cos(angle);
      let y = categoryCenter.y + radius * Math.sin(angle);
      
      // Ensure position is within boundaries
      x = Math.max(safetyMargin, Math.min(windowSize.width - safetyMargin, x));
      y = Math.max(safetyMargin, Math.min(windowSize.height - safetyMargin, y));
      
      return {
        ...skill,
        position: { x, y },
      };
    });
    
    setSkills(updatedSkills);
  }, [windowSize, initialSkills]);

  return { skills };
};
