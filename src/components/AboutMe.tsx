
import { useEffect, useRef } from "react";

const AboutMe = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineItems = useRef<(HTMLDivElement | null)[]>([]);
  const connectors = useRef<(HTMLDivElement | null)[]>([]);
  const glowingDot = useRef<HTMLDivElement>(null);

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

    // Animate the glowing dot to stop at each timeline point
    const animateGlowingDot = () => {
      if (glowingDot.current) {
        glowingDot.current.style.animation = 'none';
        glowingDot.current.style.animation = 'timeline-step-movement 12s ease-in-out infinite';
      }
    };

    // Start the animation after a short delay
    const timer = setTimeout(animateGlowingDot, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-[#010F18]">
      <div className="container px-4 mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">About Me</h2>
        
        {/* Introduction */}
        <div 
          ref={sectionRef} 
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
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500/20"></div>
          
          {/* Moving light animation along timeline */}
          <div 
            ref={glowingDot}
            className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500 z-20"
            style={{ boxShadow: "0 0 10px 2px rgba(59, 130, 246, 0.7)" }}
          ></div>
          
          {/* Timeline Items */}
          
          {/* Milestone 1: Certifications */}
          <div className="relative mb-24">
            <div 
              ref={(el) => (timelineItems.current[0] = el)} 
              className="flex flex-col md:flex-row items-center opacity-0"
            >
              <div className="md:w-1/2 md:pr-16 md:text-right mb-8 md:mb-0">
                <div className="bg-blue-900/20 p-6 rounded-lg shadow-lg border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">IT Specialist at Infosys - Jun 2021</h3>
                  <p className="text-gray-300">
                    Provided IT engineering expertise on various Fortune 500 projects, supporting large-scale enterprise environments.
                  </p>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 border-4 border-[#010F18] z-10"></div>
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
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 border-4 border-[#010F18] z-10"></div>
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
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 border-4 border-[#010F18] z-10"></div>
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
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 border-4 border-[#010F18] z-10"></div>
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
