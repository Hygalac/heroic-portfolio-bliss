
import React from "react";
import { skillsData } from "./skills/data";
import BackgroundAnimation from "./skills/BackgroundAnimation";
import SkillNetwork from "./skills/SkillNetwork";

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center">
          Skills & Tools
        </h2>
        
        {/* Background animation */}
        <BackgroundAnimation opacity={0.1} />
        
        {/* Neural network visualization */}
        <SkillNetwork skills={skillsData} />
      </div>
    </section>
  );
};

export default Skills;
