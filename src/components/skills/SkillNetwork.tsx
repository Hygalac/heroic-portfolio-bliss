
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
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  
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
  
  // Handle mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y,
      });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  
  // Handle wheel events for zooming
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = 0.05;
    const delta = e.deltaY > 0 ? -zoomFactor : zoomFactor;
    const newScale = Math.max(0.5, Math.min(2, scale + delta));
    setScale(newScale);
  };
  
  return (
    <div 
      ref={networkRef} 
      className="relative h-[650px] mx-auto mb-12 border border-blue-900/20 rounded-xl overflow-hidden bg-[#010F18] shadow-[0_0_30px_rgba(14,165,233,0.1)] cursor-grab"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div
        className="absolute transition-transform duration-75"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'center',
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
      
      {/* Instructions overlay */}
      <div className="absolute bottom-4 right-4 bg-blue-900/70 text-white px-3 py-2 rounded-md text-sm opacity-70">
        <p>Drag to pan | Scroll to zoom</p>
      </div>
    </div>
  );
};

export default SkillNetwork;
