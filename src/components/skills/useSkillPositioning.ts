
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
    
    // Custom position adjustments for specific nodes
    const customPositions: Record<string, { x: number, y: number }> = {
      "linux": { x: -80, y: 0 },     // Move Linux to the left
      "react": { x: -70, y: 20 },    // Move React to the left
      "wireshark": { x: 0, y: 50 },  // Move Wireshark down
      "javascript": { x: 60, y: 0 }, // Move JavaScript to the right
    };
    
    // Position skills around their category center with custom adjustments
    const updatedSkills = initialSkills.map(skill => {
      const categoryCenter = categoryPositions[skill.category];
      const skillsInCategory = initialSkills.filter(s => s.category === skill.category).length;
      const indexInCategory = initialSkills.filter(s => s.category === skill.category).findIndex(s => s.id === skill.id);
      const angle = (indexInCategory / skillsInCategory) * 2 * Math.PI;
      
      // Use elliptical distribution to add more horizontal spacing
      const horizontalRadius = 200;
      const verticalRadius = 150;
      
      // Base positioning
      let xPos = categoryCenter.x + horizontalRadius * Math.cos(angle);
      let yPos = categoryCenter.y + verticalRadius * Math.sin(angle);
      
      // Apply custom position offsets if defined
      if (customPositions[skill.id]) {
        xPos += customPositions[skill.id].x;
        yPos += customPositions[skill.id].y;
      }
      
      return {
        ...skill,
        position: {
          x: xPos,
          y: yPos,
        },
      };
    });
    
    setSkills(updatedSkills);
  }, [windowSize, initialSkills]);

  return { skills };
};
