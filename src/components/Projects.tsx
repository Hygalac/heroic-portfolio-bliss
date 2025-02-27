
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";

const projects = [
  {
    title: "Mobile App Showcase",
    description: "A fully responsive mobile app with a sleek UI and backend integration.",
    image: "/placeholder.svg",
    position: "left",
  },
  {
    title: "Game Development Project",
    description: "A 2D/3D game built with modern engines, featuring interactive gameplay mechanics.",
    image: "/placeholder.svg",
    position: "right",
  },
  {
    title: "System Automation Tool",
    description: "A custom automation tool designed to optimize workflows and enhance productivity.",
    image: "/placeholder.svg",
    position: "left",
  },
];

const Projects = () => {
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-[#010F18] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Projects</h2>
        
        <div className="relative">
          {/* Connector Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-500/20 hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500 to-blue-500/0 animate-connector-pulse" />
          </div>

          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => (projectRefs.current[index] = el)}
              className={`mb-20 lg:mb-32 opacity-0 translate-y-10 transition-all duration-1000 ease-out
                ${project.position === "left" ? "lg:flex-row" : "lg:flex-row-reverse"}
                flex flex-col lg:flex-row items-center gap-8 lg:gap-16`}
            >
              <div className="relative w-full lg:w-1/2 group">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[300px] lg:h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                    style={{
                      transform: `translateY(${index * 10}px)`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#010F18] via-transparent to-transparent opacity-60" />
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-4">
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>
                <Button
                  variant="outline"
                  className="mt-4 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300"
                >
                  View Project
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
