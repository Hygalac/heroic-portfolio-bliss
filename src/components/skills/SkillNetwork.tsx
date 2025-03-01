
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
  
  // Panning state
  const [isPanning, setIsPanning] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPanPosition, setStartPanPosition] = useState({ x: 0, y: 0 });
  
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

  // Mouse event handlers for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    setStartPanPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPosition({
        x: e.clientX - startPanPosition.x,
        y: e.clientY - startPanPosition.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleMouseLeave = () => {
    setIsPanning(false);
  };
  
  return (
    <div 
      ref={networkRef} 
      className="relative h-[650px] mx-auto mb-12 border border-blue-900/20 rounded-xl overflow-hidden bg-[#010F18] shadow-[0_0_30px_rgba(14,165,233,0.1)] cursor-move"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive content container that can be panned */}
      <div 
        className="absolute w-full h-full"
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isPanning ? 'none' : 'transform 0.1s ease-out'
        }}
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
    </div>
  );
};

export default SkillNetwork;
