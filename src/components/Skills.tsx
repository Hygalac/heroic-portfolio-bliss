
import React from "react";
import { skillsData } from "./skills/data";
import BackgroundAnimation from "./skills/BackgroundAnimation";
import SkillNetwork from "./skills/SkillNetwork";
import LinearSkillView from "./skills/LinearSkillView";
import { useIsMobile } from "@/hooks/use-mobile";

const Skills: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center">
          Skills & Tools
        </h2>
        
        {/* Background animation */}
        <BackgroundAnimation opacity={0.08} color="blue" density={20} />
        
        {/* Conditionally render network or linear view based on screen size */}
        {!isMobile ? (
          <>
            <SkillNetwork skills={skillsData} />
            <div className="mt-8 text-center text-sm text-blue-400/60">
              Drag to pan and explore all skills
            </div>
          </>
        ) : (
          <LinearSkillView skills={skillsData} />
        )}
      </div>
    </section>
  );
};

export default Skills;
