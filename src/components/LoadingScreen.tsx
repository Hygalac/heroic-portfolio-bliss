
import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#11365f] overflow-hidden">
      {/* Animated tech elements */}
      <div className="absolute inset-0">
        {/* Floating circuit patterns */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#ada48f]/30 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-[#ada48f]/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#ada48f]/35 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-[#ada48f]/25 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Orbiting elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 border border-[#ada48f]/20 rounded-full animate-spin" style={{ animationDuration: '8s' }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#ada48f] rounded-full"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-[#ada48f]/15 rounded-full animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-[#ada48f] rounded-full"></div>
          </div>
        </div>

        {/* Tech grid lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ada48f] to-transparent animate-pulse"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ada48f] to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#ada48f] to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#ada48f] to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>

      {/* Central moon */}
      <div className="relative z-10">
        <div className="w-32 h-32 bg-[#ada48f] rounded-full relative overflow-hidden animate-breathe">
          {/* Moon surface texture */}
          <div className="absolute top-4 left-6 w-3 h-3 bg-[#9a9085] rounded-full opacity-60"></div>
          <div className="absolute top-8 right-8 w-2 h-2 bg-[#9a9085] rounded-full opacity-40"></div>
          <div className="absolute bottom-6 left-4 w-4 h-4 bg-[#9a9085] rounded-full opacity-50"></div>
          <div className="absolute bottom-8 right-6 w-1.5 h-1.5 bg-[#9a9085] rounded-full opacity-70"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-[#9a9085] rounded-full opacity-45"></div>
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-[#ada48f] opacity-30 animate-pulse"></div>
        </div>
        
        {/* Moon glow */}
        <div className="absolute inset-0 w-32 h-32 bg-[#ada48f] rounded-full blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Binary code rain effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-[#ada48f]/20 text-xs font-mono animate-fade-in"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          >
            {Math.random() > 0.5 ? '1010' : '0101'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
