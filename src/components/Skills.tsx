
import React, { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CircuitBoard, Zap } from "lucide-react";

type Skill = {
  id: string;
  name: string;
  category: string;
  description: string;
  connections: string[];
  position?: { x: number; y: number };
};

const skillsData: Skill[] = [
  // Programming & Scripting
  {
    id: "python",
    name: "Python",
    category: "Programming & Scripting",
    description: "Versatile general-purpose language used for web development, data analysis, AI, and automation.",
    connections: ["javascript", "bash", "unity"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Programming & Scripting",
    description: "Dynamic language that powers interactive web experiences and cross-platform applications.",
    connections: ["react", "reactnative", "python"],
  },
  {
    id: "bash",
    name: "Bash",
    category: "Programming & Scripting",
    description: "Command line shell and scripting language for Unix-based systems and automation.",
    connections: ["linux", "python", "docker"],
  },
  
  // Cloud & DevOps
  {
    id: "azure",
    name: "Azure",
    category: "Cloud & DevOps",
    description: "Microsoft's cloud computing platform for building, deploying, and managing applications and services.",
    connections: ["terraform", "docker", "okta"],
  },
  {
    id: "terraform",
    name: "Terraform",
    category: "Cloud & DevOps",
    description: "Infrastructure as Code tool for provisioning and managing cloud infrastructure.",
    connections: ["azure", "docker"],
  },
  {
    id: "docker",
    name: "Docker",
    category: "Cloud & DevOps",
    description: "Platform for developing, shipping, and running applications in containers.",
    connections: ["terraform", "azure", "bash"],
  },
  
  // Networking & Security
  {
    id: "wireshark",
    name: "Wireshark",
    category: "Networking & Security",
    description: "Network protocol analyzer for network troubleshooting and analysis.",
    connections: ["qualys", "automox"],
  },
  {
    id: "automox",
    name: "Automox",
    category: "Networking & Security",
    description: "Cloud-native endpoint management platform for patch management and system hygiene.",
    connections: ["wireshark", "okta"],
  },
  {
    id: "qualys",
    name: "Qualys",
    category: "Networking & Security",
    description: "Cloud-based security and compliance platform for identifying vulnerabilities.",
    connections: ["wireshark", "okta"],
  },
  {
    id: "okta",
    name: "Okta",
    category: "Networking & Security",
    description: "Identity management service for secure user authentication and authorization.",
    connections: ["qualys", "automox", "azure"],
  },
  
  // Operating Systems
  {
    id: "linux",
    name: "Linux (Ubuntu)",
    category: "Operating Systems",
    description: "Open-source operating system built on the Linux kernel, known for stability and security.",
    connections: ["bash", "docker"],
  },
  
  // Mobile & Game Development
  {
    id: "unity",
    name: "Unity",
    category: "Mobile & Game Development",
    description: "Cross-platform game engine for developing 2D and 3D games and interactive content.",
    connections: ["python", "react"],
  },
  {
    id: "react",
    name: "React",
    category: "Mobile & Game Development",
    description: "JavaScript library for building user interfaces, particularly single-page applications.",
    connections: ["javascript", "reactnative", "unity"],
  },
  {
    id: "reactnative",
    name: "React Native",
    category: "Mobile & Game Development",
    description: "Framework for building native mobile applications using React and JavaScript.",
    connections: ["react", "javascript"],
  },
];

const Skills: React.FC = () => {
  const networkRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [skills, setSkills] = useState<Skill[]>(skillsData);
  
  // Layout skills in a network-like pattern
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
  
  // Position skills with more spacing
  useEffect(() => {
    if (windowSize.width === 0 || windowSize.height === 0) return;
    
    // Group skills by category for clustered positioning
    const categories = Array.from(new Set(skills.map(skill => skill.category)));
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
    const updatedSkills = skills.map(skill => {
      const categoryCenter = categoryPositions[skill.category];
      const skillsInCategory = skills.filter(s => s.category === skill.category).length;
      const indexInCategory = skills.filter(s => s.category === skill.category).findIndex(s => s.id === skill.id);
      const angle = (indexInCategory / skillsInCategory) * 2 * Math.PI;
      // Increased radius for more spacing between skills within a category
      const radius = 150;
      
      return {
        ...skill,
        position: {
          x: categoryCenter.x + radius * Math.cos(angle),
          y: categoryCenter.y + radius * Math.sin(angle),
        },
      };
    });
    
    setSkills(updatedSkills);
  }, [windowSize, skillsData]);
  
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
  
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center">
          Skills & Tools
        </h2>
        
        {/* Background animation */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {Array.from({ length: 20 }).map((_, index) => (
            <CircuitBoard
              key={index}
              className="absolute text-blue-500 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.3 + Math.random() * 0.3,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
              size={Math.random() * 30 + 20}
            />
          ))}
        </div>
        
        {/* Neural network visualization */}
        <div 
          ref={networkRef} 
          className="relative h-[650px] mx-auto mb-12 border border-blue-900/20 rounded-xl overflow-hidden bg-[#010F18] shadow-[0_0_30px_rgba(14,165,233,0.1)]"
        >
          {/* Connection lines */}
          <svg className="absolute w-full h-full top-0 left-0 z-10 pointer-events-none">
            {skills.map(skill => 
              skill.connections.map(connectionId => {
                const connectedSkill = skills.find(s => s.id === connectionId);
                if (!skill.position || !connectedSkill?.position) return null;
                
                const isHighlighted = 
                  hoveredSkill === skill.id || 
                  hoveredSkill === connectionId;
                
                return (
                  <line
                    key={`${skill.id}-${connectionId}`}
                    x1={skill.position.x}
                    y1={skill.position.y}
                    x2={connectedSkill.position.x}
                    y2={connectedSkill.position.y}
                    className={`transition-all duration-300 ${
                      isHighlighted 
                        ? "stroke-blue-400 stroke-[2px] animate-connector-pulse" 
                        : "stroke-blue-600/30 stroke-[1px]"
                    }`}
                  />
                );
              })
            )}
          </svg>
          
          {/* Skill nodes */}
          <TooltipProvider>
            {skills.map((skill) => skill.position && (
              <Tooltip key={skill.id}>
                <TooltipTrigger asChild>
                  <div
                    className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 bg-[#001A2C] px-3 py-2 rounded-md border transition-all duration-300 cursor-pointer ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    } ${
                      hoveredSkill === skill.id
                        ? "border-blue-400 shadow-[0_0_15px_rgba(56,189,248,0.6)] scale-110"
                        : "border-blue-900/50 hover:border-blue-500"
                    }`}
                    style={{
                      left: skill.position.x,
                      top: skill.position.y,
                      transitionDelay: `${Math.random() * 0.5}s`,
                    }}
                    onMouseEnter={() => setHoveredSkill(skill.id)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex items-center gap-2">
                      <Zap
                        size={16}
                        className={`text-blue-400 ${
                          hoveredSkill === skill.id ? "animate-pulse" : ""
                        }`}
                      />
                      <span className="whitespace-nowrap text-sm font-medium text-white">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs bg-[#002A44] text-white border border-blue-500/30 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                  <div>
                    <h3 className="font-bold text-blue-300">{skill.name}</h3>
                    <p className="text-sm text-gray-300 mt-1">{skill.description}</p>
                    <div className="text-xs text-blue-400/80 mt-2">
                      Category: {skill.category}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
          
          {/* Category labels */}
          {Array.from(new Set(skills.map(skill => skill.category))).map((category, index) => {
            const categorySkills = skills.filter(s => s.category === category);
            const avgX = categorySkills.reduce((sum, s) => sum + (s.position?.x || 0), 0) / categorySkills.length;
            const avgY = categorySkills.reduce((sum, s) => sum + (s.position?.y || 0), 0) / categorySkills.length;
            
            return (
              <div
                key={category}
                className="absolute z-30 bg-blue-900/20 px-3 py-1 rounded-full text-xs font-bold text-blue-300 border border-blue-800/50"
                style={{
                  left: avgX,
                  top: avgY - 70, // Moved category labels further from skills
                  transform: "translateX(-50%)",
                }}
              >
                {category}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
