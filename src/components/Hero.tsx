
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#010F18] overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/lovable-uploads/bafdc1e7-7019-4c27-9796-40ab46b25a1d.png"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#010F18]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`space-y-6 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-mono animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
                Abdifatah Osman
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 font-mono animate-fade-in opacity-0" style={{ animationDelay: "0.6s" }}>
                Systems Engineer | Mobile & Game Developer
              </p>
            </div>
            
            <p className="text-lg text-gray-300 max-w-xl font-mono animate-fade-in opacity-0" style={{ animationDelay: "0.8s" }}>
              I design and code beautifully simple things, and I love what I do.
            </p>
            
            <Link 
              to="/contact" 
              className="inline-block px-8 py-4 bg-blue-500 text-white rounded-lg font-mono transform transition-all duration-300 hover:scale-105 hover:bg-blue-600 animate-fade-in opacity-0 animate-button-glow" 
              style={{ animationDelay: "1s" }}
            >
              Work With Me!
            </Link>
          </div>

          {/* Placeholder for future illustration */}
          <div className="hidden lg:block">
            {/* Add your illustration here later */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
