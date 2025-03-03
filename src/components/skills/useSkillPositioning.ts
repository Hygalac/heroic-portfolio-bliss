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
      
      // Custom position adjustments for specific nodes - updated positions per user request
      const customPositions: Record<string, { x: number, y: number }> = {
        "wireshark": { x: 0, y: 100 },
        "git": { x: -20, y: 80 },
        "cicd": { x: 30, y: 90 },
        
        "mongodb": { x: 100, y: -60 },
        "azure": { x: 120, y: 0 },
        "terraform": { x: 100, y: 30 },
        
        "reactnative": { x: -100, y: -20 },
        
        "linux": { x: -100, y: 0 },
        "react": { x: -70, y: -50 },
        "javascript": { x: 60, y: -40 },
        "python": { x: 20, y: -80 },
        "typescript": { x: 40, y: 60 },
        "nodejs": { x: -30, y: 20 },
        "express": { x: 70, y: -70 },
        "mysql": { x: 80, y: 80 },
        "npm": { x: -60, y: -30 },
        "lighthouse": { x: -90, y: 40 },
        "rest": { x: 50, y: 50 },
        "bash": { x: 0, y: -70 },
        "unity": { x: -40, y: -90 },
        "siem": { x: 90, y: -20 },
        "qualys": { x: -80, y: 70 },
        "automox": { x: 40, y: -30 },
        "okta": { x: -50, y: 30 },
        "prometheus": { x: 90, y: 60 },
        "ansible": { x: -80, y: -60 },
        "docker": { x: 20, y: 70 },
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
