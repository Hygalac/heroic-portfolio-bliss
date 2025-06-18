
import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // Wait for fade out animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-800 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "#02121e" }}
    >
      {/* Tech Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
            {Array.from({ length: 96 }).map((_, i) => (
              <div
                key={i}
                className="border border-[#ada48f]/20 animate-pulse"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "3s"
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0">
        {/* Circuit Lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`line-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-[#ada48f]/40 to-transparent animate-pulse"
            style={{
              left: `${10 + i * 12}%`,
              height: "60%",
              top: "20%",
              animationDelay: `${i * 0.3}s`,
              animationDuration: "2s"
            }}
          />
        ))}

        {/* Orbiting Dots */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute w-2 h-2 bg-[#ada48f]/60 rounded-full"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              animation: `orbit-${i % 3} ${4 + i}s linear infinite`
            }}
          />
        ))}

        {/* Binary Code Rain */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`binary-${i}`}
            className="absolute text-[#ada48f]/30 text-xs font-mono animate-pulse"
            style={{
              left: `${5 + i * 8}%`,
              top: `${Math.random() * 80}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1.5s"
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </div>
        ))}
      </div>

      {/* Main Moon Container */}
      <div className="relative">
        {/* Moon Transformation */}
        <div className="relative w-32 h-32">
          {/* Full Moon Base */}
          <div 
            className="absolute inset-0 rounded-full transition-all duration-2000 ease-out"
            style={{ 
              backgroundColor: "#ada48f",
              boxShadow: "0 0 40px rgba(173, 164, 143, 0.6), inset 0 0 20px rgba(173, 164, 143, 0.3)"
            }}
          />
          
          {/* Crescent Overlay that fades out */}
          <div 
            className="absolute inset-0 rounded-full animate-crescent-reveal"
            style={{ backgroundColor: "#02121e" }}
          />
          
          {/* Moon Surface Details */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div 
              className="absolute w-4 h-4 rounded-full opacity-30"
              style={{ 
                backgroundColor: "#02121e",
                top: "25%",
                left: "30%"
              }}
            />
            <div 
              className="absolute w-2 h-2 rounded-full opacity-20"
              style={{ 
                backgroundColor: "#02121e",
                top: "60%",
                left: "60%"
              }}
            />
            <div 
              className="absolute w-3 h-3 rounded-full opacity-25"
              style={{ 
                backgroundColor: "#02121e",
                top: "45%",
                left: "20%"
              }}
            />
          </div>
        </div>

        {/* Pulsing Ring */}
        <div 
          className="absolute inset-0 rounded-full border-2 animate-ping"
          style={{ 
            borderColor: "#ada48f",
            animationDuration: "2s"
          }}
        />
      </div>

      {/* Loading Text */}
      <div className="absolute bottom-1/4 text-center">
        <div 
          className="text-xl font-light tracking-widest animate-pulse"
          style={{ color: "#ada48f" }}
        >
          LOADING
        </div>
        <div 
          className="flex justify-center mt-4 space-x-1"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full animate-bounce"
              style={{ 
                backgroundColor: "#ada48f",
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes orbit-0 {
          0% { transform: translate(-50%, -50%) rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        @keyframes orbit-1 {
          0% { transform: translate(-50%, -50%) rotate(120deg) translateX(100px) rotate(-120deg); }
          100% { transform: translate(-50%, -50%) rotate(480deg) translateX(100px) rotate(-480deg); }
        }
        @keyframes orbit-2 {
          0% { transform: translate(-50%, -50%) rotate(240deg) translateX(60px) rotate(-240deg); }
          100% { transform: translate(-50%, -50%) rotate(600deg) translateX(60px) rotate(-600deg); }
        }
        @keyframes crescent-reveal {
          0% { 
            clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%);
          }
          50% {
            clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%);
          }
          100% { 
            clip-path: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
