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
    
    // Assign a center point for each category with more horizontal spread
    categories.forEach((category, index) => {
      const totalCategories = categories.length;
      const angle = (index / totalCategories) * 2 * Math.PI;
      
      // Increase horizontal spread by adjusting radius calculation
      const horizontalSpreadFactor = 0.5; // Increased from 0.3 to 0.5
      const verticalSpreadFactor = 0.2; // Reduced vertical spread
      
      const radius = Math.min(windowSize.width, windowSize.height);
      
      categoryPositions[category] = {
        x: windowSize.width / 2 + radius * horizontalSpreadFactor * Math.cos(angle),
        y: windowSize.height / 2 + radius * verticalSpreadFactor * Math.sin(angle),
      };
    });
    
    // Position skills around their category center
    const updatedSkills = initialSkills.map(skill => {
      const categoryCenter = categoryPositions[skill.category];
      const skillsInCategory = initialSkills.filter(s => s.category === skill.category);
      const indexInCategory = skillsInCategory.findIndex(s => s.id === skill.id);
      
      // Increase horizontal distribution
      const horizontalSpreadMultiplier = 1.5; // Increased from 1.2
      const angleFactor = skillsInCategory.length <= 4 ? 1 : 0.8;
      const angle = (indexInCategory / skillsInCategory.length) * 2 * Math.PI * angleFactor;
      
      // Adjust radius based on number of skills in category with more horizontal emphasis
      const baseRadius = skillsInCategory.length <= 3 ? 100 : 
                         skillsInCategory.length <= 6 ? 150 :
                         skillsInCategory.length <= 10 ? 200 : 250;
      
      // Emphasize horizontal spread
      const horizontalStretch = 1.5; // Increased from 1.2
      const horizontalRadius = baseRadius * horizontalStretch;
      const verticalRadius = baseRadius * 0.6; // Reduced vertical radius
      
      // Apply noise to prevent perfect arrangement
      const noiseX = Math.sin(indexInCategory * 7.3) * 25; // Increased noise
      const noiseY = Math.cos(indexInCategory * 3.7) * 15;
      
      // Calculate position with noise
      let xPos = categoryCenter.x + horizontalRadius * Math.cos(angle) + noiseX;
      let yPos = categoryCenter.y + verticalRadius * Math.sin(angle) + noiseY;
      
      // Custom position adjustments for specific nodes
      const customPositions: Record<string, { x: number, y: number }> = {
        "wireshark": { x: -50, y: 100 },
        "git": { x: -100, y: 80 },
        "cicd": { x: 100, y: 90 },
        
        "mongodb": { x: 200, y: -60 },
        "azure": { x: 250, y: 0 },
        "terraform": { x: 220, y: 30 },
        "reactnative": { x: -200, y: -20 },
        "linux": { x: -250, y: 0 },
        "react": { x: -150, y: 10 },
        "javascript": { x: 150, y: -40 },
        "python": { x: 50, y: -120 },
        "typescript": { x: 100, y: 100 },
        "nodejs": { x: -100, y: 20 },
        "express": { x: 180, y: -70 },
        "mysql": { x: 200, y: 0 },
        "npm": { x: -150, y: -30 },
        "lighthouse": { x: -200, y: 40 },
        "rest": { x: 120, y: 50 },
        "bash": { x: 0, y: -100 },
        "unity": { x: -80, y: -130 },
        "siem": { x: 220, y: -20 },
        "qualys": { x: -180, y: 70 },
        "automox": { x: 100, y: -30 },
        "okta": { x: -120, y: 30 },
        "prometheus": { x: 250, y: 60 },
        "ansible": { x: -180, y: -60 },
        "docker": { x: 50, y: 110 },
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