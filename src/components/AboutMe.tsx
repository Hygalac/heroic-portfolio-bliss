
import { useEffect, useRef, useState } from "react";

const AboutMe = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineItems = useRef<(HTMLDivElement | null)[]>([]);
  const connectors = useRef<(HTMLDivElement | null)[]>([]);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number | null>(null);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe intro section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Observe timeline items
    timelineItems.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    // Observe connectors
    connectors.current.forEach((connector) => {
      if (connector) {
        const connectorObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("animate-connector-pulse");
                const line = entry.target.querySelector(".timeline-line");
                if (line) {
                  line.classList.add("animate-draw-line");
                }
              }
            });
          },
          { threshold: 0.5 }
        );
        
        connectorObserver.observe(connector);
      }
    });

    // Start timeline animation when section comes into view
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animationStarted) {
          setAnimationStarted(true);
          animateTimelineLight();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      timelineObserver.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      timelineObserver.disconnect();
    };
  }, [animationStarted]);

  // Function to animate the timeline light
  const animateTimelineLight = () => {
    let currentNode = 0;
    const totalNodes = 4; // Total number of nodes in our timeline
    
    const moveToNextNode = () => {
      if (currentNode < totalNodes) {
        setActiveNodeIndex(currentNode);
        
        // Wait at the node for 3 seconds, then move to next
        setTimeout(() => {
          currentNode++;
          if (currentNode < totalNodes) {
            moveToNextNode();
          } else {
            // Reset after reaching the end
            setTimeout(() => {
              setActiveNodeIndex(null);
              currentNode = 0;
              setTimeout(() => {
                moveToNextNode();
              }, 1000);
            }, 3000);
          }
        }, 3000);
      }
    };

    moveToNextNode();
  };

  return (
    <section id="about" className="py-20 bg-[#010F18]" ref={sectionRef}>
      <div className="container px-4 mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">About Me</h2>
        
        {/* Introduction */}
        <div 
          className="max-w-3xl mx-auto mb-16 opacity-0 text-white text-center"
        >
          <p className="text-lg leading-relaxed">
            Hello! I'm Abdifatah Osman, a skilled Systems Engineer with a passion for Mobile and Game Development. 
            While I build enterprise systems professionally, I channel my creativity into crafting engaging mobile 
            applications and immersive games during my personal time.
          </p>
        </div>
        
        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500/20">
            {/* Traveling light effect */}
            {animationStarted && (
              <div className="absolute w-3 h-3 left-1/2 transform -translate-x-1/2 rounded-full bg-blue-500 shadow-glow z-20 transition-all duration-1000 ease-in-out" 
                   style={{ 
                     top: activeNodeIndex !== null ? `${activeNodeIndex * 33.33}%` : '-10px',
                     opacity: activeNodeIndex !== null ? 1 : 0
                   }} 
              />
            )}
          </div>
          
          {/* Timeline Nodes */}
          
          {/* Milestone 1: Certifications */}
          <div className="relative mb-24">
            <div 
              ref={(el) => (timelineItems.current[0] = el)} 
              className="flex flex-col md:flex-row items-center opacity-0"
            >
              <div className="md:w-1/2 md:pr-16 md:text-right mb-8 md:mb-0">
                <div className="bg-blue-900/20 p-6 rounded-lg shadow-lg border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">IT Specialist - Provided IT engineering expertise on various Fortune 500 projects, supporting large-scale enterprise environments.</h3>
                  <p className="text-gray-300">
                    Developed a passion for cloud infrastructure and networking fundamentals, laying the groundwork for my engineering career.
                  </p>
                </div>
              </div>
              <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 border-4 border-[#010F18] z-10 ${activeNodeIndex === 0 ? 'animate-pulse shadow-glow' : ''}`}></div>
              <div className="md:w-1/2"></div>
            </div>
            <div 
              ref={(el) => (connectors.current[0] = el)} 
              className="absolute left-1/2 transform -translate-x-1/2 mt-6 w-1 h-16 flex items-center justify-center"
            >
              <div className="timeline-line w-1 bg-blue-500/50 h-0 transition-all duration-1000"></div>
            </div>
          </div>
          
          {/* Milestone 2: First Job */}
          <div className="relative mb-24">
            <div 
              ref={(el) => (timelineItems.current[1] = el)} 
              className="flex flex-col md:flex-row items-center opacity-0"
            >
              <div className="md:w-1/2"></div>
              <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 border-4 border-[#010F18] z-10 ${activeNodeIndex === 1 ? 'animate-pulse shadow-glow' : ''}`}></div>
              <div className="md:w-1/2 md:pl-16 text-left mb-8 md:mb-0">
                <div className="bg-blue-900/20 p-6 rounded-lg shadow-lg border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">System Administrator at Intel Corporation - Feb 2023 - Feb 2024</h3>
                  <p className="text-gray-300">
                    Gained hands-on experience in system administration and technical support, working with enterprise-level infrastructure.
                  </p>
                </div>
              </div>
            </div>
            <div 
              ref={(el) => (connectors.current[1] = el)} 
              className="absolute left-1/2 transform -translate-x-1/2 mt-6 w-1 h-16 flex items-center justify-center"
            >
              <div className="timeline-line w-1 bg-blue-500/50 h-0 transition-all duration-1000"></div>
            </div>
          </div>
          
          {/* Milestone 3: Key Projects */}
          <div className="relative mb-24">
            <div 
              ref={(el) => (timelineItems.current[2] = el)} 
              className="flex flex-col md:flex-row items-center opacity-0"
            >
              <div className="md:w-1/2 md:pr-16 md:text-right mb-8 md:mb-0">
                <div className="bg-blue-900/20 p-6 rounded-lg shadow-lg border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Developed Rahatul Ruh Mobile App - 2024</h3>
                  <p className="text-gray-300">
                    Created an innovative mobile app that helps users sleep with the soothing sound of the Quran, combining technology with mindfulness.
                  </p>
                </div>
              </div>
              <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 border-4 border-[#010F18] z-10 ${activeNodeIndex === 2 ? 'animate-pulse shadow-glow' : ''}`}></div>
              <div className="md:w-1/2"></div>
            </div>
            <div 
              ref={(el) => (connectors.current[2] = el)} 
              className="absolute left-1/2 transform -translate-x-1/2 mt-6 w-1 h-16 flex items-center justify-center"
            >
              <div className="timeline-line w-1 bg-blue-500/50 h-0 transition-all duration-1000"></div>
            </div>
          </div>
          
          {/* Milestone 4: Current Role */}
          <div className="relative">
            <div 
              ref={(el) => (timelineItems.current[3] = el)} 
              className="flex flex-col md:flex-row items-center opacity-0"
            >
              <div className="md:w-1/2"></div>
              <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 border-4 border-[#010F18] z-10 ${activeNodeIndex === 3 ? 'animate-pulse shadow-glow' : ''}`}></div>
              <div className="md:w-1/2 md:pl-16 text-left">
                <div className="bg-blue-900/20 p-6 rounded-lg shadow-lg border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Systems Engineer at Soul Machines - Feb 2025 - Present</h3>
                  <p className="text-gray-300">
                    Leading projects that bridge technology and creativity, focusing on innovative solutions and system optimization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
