
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
      const totalCategories = categories.length;
      const angle = (index / totalCategories) * 2 * Math.PI;
      
      // Adjust radius based on number of categories to ensure better distribution
      const radius = Math.min(windowSize.width, windowSize.height) * 0.3;
      
      categoryPositions[category] = {
        x: windowSize.width / 2 + radius * Math.cos(angle),
        y: windowSize.height / 2 + radius * Math.sin(angle),
      };
    });
    
    // Position skills around their category center
    const updatedSkills = initialSkills.map(skill => {
      const categoryCenter = categoryPositions[skill.category];
      const skillsInCategory = initialSkills.filter(s => s.category === skill.category);
      const indexInCategory = skillsInCategory.findIndex(s => s.id === skill.id);
      
      // Create a more even distribution based on number of skills in category
      const angleFactor = skillsInCategory.length <= 4 ? 0.8 : 0.6; // Adjust for categories with few/many items
      const angle = (indexInCategory / skillsInCategory.length) * 2 * Math.PI * angleFactor;
      
      // Adjust radius based on number of skills in category
      const baseRadius = skillsInCategory.length <= 3 ? 80 : 
                         skillsInCategory.length <= 6 ? 120 :
                         skillsInCategory.length <= 10 ? 150 : 180;
      
      // Use elliptical distribution to add more horizontal spacing
      const horizontalStretch = 1.2;
      const horizontalRadius = baseRadius * horizontalStretch;
      const verticalRadius = baseRadius;
      
      // Apply noise to prevent perfect circle arrangement
      const noiseX = Math.sin(indexInCategory * 7.3) * 15;
      const noiseY = Math.cos(indexInCategory * 3.7) * 15;
      
      // Calculate position with noise
      let xPos = categoryCenter.x + horizontalRadius * Math.cos(angle) + noiseX;
      let yPos = categoryCenter.y + verticalRadius * Math.sin(angle) + noiseY;
      
      // Custom position adjustments for specific nodes
      const customPositions: Record<string, { x: number, y: number }> = {
        "linux": { x: -80, y: 0 },
        "react": { x: -70, y: 20 },
        "wireshark": { x: 0, y: 50 },
        "javascript": { x: 60, y: 0 },
        "python": { x: 20, y: -30 },
        "git": { x: -20, y: -40 },
        "typescript": { x: 40, y: 30 },
        "nodejs": { x: -30, y: 60 },
        "express": { x: 70, y: -20 },
        "mongodb": { x: -50, y: -60 },
        "mysql": { x: 80, y: 40 },
      };
      
      // Apply custom position offsets if defined
      if (customPositions[skill.id]) {
        xPos += customPositions[skill.id].x;
        yPos += customPositions[skill.id].y;
      }
      
      // Ensure all nodes are within view boundaries with some padding
      const padding = 50;
      xPos = Math.max(padding, Math.min(windowSize.width - padding, xPos));
      yPos = Math.max(padding, Math.min(windowSize.height - padding, yPos));
      
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
