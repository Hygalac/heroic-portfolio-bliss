
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
    
    // Group skills by category for clustered positioning
    const categories = Array.from(new Set(initialSkills.map(skill => skill.category)));
    const categoryPositions: Record<string, { x: number, y: number }> = {};
    
    // Assign a center point for each category with more spread
    categories.forEach((category, index) => {
      const angle = (index / categories.length) * 2 * Math.PI;
      // Increased radius for more spacing between categories
      const radius = Math.min(windowSize.width, windowSize.height) * 0.35;
      categoryPositions[category] = {
        x: windowSize.width / 2 + radius * Math.cos(angle),
        y: windowSize.height / 2 + radius * Math.sin(angle),
      };
    });
    
    // Position skills around their category center with more spacing
    const updatedSkills = initialSkills.map(skill => {
      const categoryCenter = categoryPositions[skill.category];
      const skillsInCategory = initialSkills.filter(s => s.category === skill.category).length;
      const indexInCategory = initialSkills.filter(s => s.category === skill.category).findIndex(s => s.id === skill.id);
      const angle = (indexInCategory / skillsInCategory) * 2 * Math.PI;
      
      // Use elliptical distribution to add more horizontal spacing
      // Horizontal radius is larger than vertical radius
      const horizontalRadius = 200; // Increased from 150
      const verticalRadius = 150;
      
      return {
        ...skill,
        position: {
          x: categoryCenter.x + horizontalRadius * Math.cos(angle),
          y: categoryCenter.y + verticalRadius * Math.sin(angle),
        },
      };
    });
    
    setSkills(updatedSkills);
  }, [windowSize, initialSkills]);

  return { skills };
};
