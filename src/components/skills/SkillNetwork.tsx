
import React, { useState, useRef, useEffect } from "react";
import { Skill } from "./types";
import ConnectionLines from "./ConnectionLines";
import SkillNode from "./SkillNode";
import CategoryLabel from "./CategoryLabel";
import { useSkillPositioning } from "./useSkillPositioning";

interface SkillNetworkProps {
  skills: Skill[];
}

const SkillNetwork: React.FC<SkillNetworkProps> = ({ skills: initialSkills }) => {
  const networkRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  // Calculate window size for positioning
  useEffect(() => {
    const handleResize = () => {
      if (networkRef.current) {
        setWindowSize({
          width: networkRef.current.offsetWidth,
          height: networkRef.current.offsetHeight,
        });
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  // Visibility check for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (networkRef.current) {
      observer.observe(networkRef.current);
    }
    
    return () => {
      if (networkRef.current) {
        observer.unobserve(networkRef.current);
      }
    };
  }, []);
  
  // Position skills using the custom hook
  const { skills } = useSkillPositioning({ skills: initialSkills, windowSize });
  
  // Get unique categories
  const categories = Array.from(new Set(skills.map(skill => skill.category)));
  
  return (
    <div 
      ref={networkRef} 
      className="relative h-[650px] mx-auto mb-12 border border-blue-900/20 rounded-xl overflow-hidden bg-[#010F18] shadow-[0_0_30px_rgba(14,165,233,0.1)]"
    >
      {/* Connection lines between related skills */}
      <ConnectionLines skills={skills} hoveredSkill={hoveredSkill} />
      
      {/* Skill nodes */}
      {skills.map((skill) => (
        <SkillNode 
          key={skill.id}
          skill={skill}
          isVisible={isVisible}
          hoveredSkill={hoveredSkill}
          onHover={setHoveredSkill}
        />
      ))}
      
      {/* Category labels */}
      {categories.map((category) => (
        <CategoryLabel key={category} category={category} skills={skills} />
      ))}
    </div>
  );
};

export default SkillNetwork;
