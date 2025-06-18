
import { useEffect, useState } from "react";

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-[#010F18] flex items-center justify-center transition-opacity duration-500 ${isComplete ? 'opacity-0' : 'opacity-100'}`}>
      {/* Circuit Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
          {/* Animated circuit lines */}
          <g stroke="#3B82F6" strokeWidth="1" fill="none">
            <path d="M100,100 L300,100 L300,300 L500,300" className="animate-pulse" />
            <path d="M500,300 L700,300 L700,500 L900,500" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
            <path d="M100,600 L400,600 L400,800 L700,800" className="animate-pulse" style={{ animationDelay: "1s" }} />
            <path d="M200,200 L200,400 L600,400 L600,600" className="animate-pulse" style={{ animationDelay: "1.5s" }} />
          </g>
          
          {/* Circuit nodes */}
          <g fill="#3B82F6">
            <circle cx="100" cy="100" r="3" className="animate-pulse" />
            <circle cx="300" cy="300" r="3" className="animate-pulse" style={{ animationDelay: "0.3s" }} />
            <circle cx="500" cy="300" r="3" className="animate-pulse" style={{ animationDelay: "0.6s" }} />
            <circle cx="700" cy="500" r="3" className="animate-pulse" style={{ animationDelay: "0.9s" }} />
            <circle cx="900" cy="500" r="3" className="animate-pulse" style={{ animationDelay: "1.2s" }} />
          </g>
        </svg>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center">
        {/* Animated Logo/Icon */}
        <div className="mb-8 relative">
          <div className="w-20 h-20 mx-auto relative">
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/30"></div>
            <div className="absolute inset-2 rounded-full border-2 border-blue-400/50 animate-spin"></div>
            <div className="absolute inset-4 rounded-full border-2 border-blue-300/70 animate-spin" style={{ animationDirection: "reverse", animationDuration: "2s" }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Orbiting particles */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: "8s" }}>
            <div className="absolute top-0 left-1/2 w-1 h-1 bg-blue-400 rounded-full transform -translate-x-1/2"></div>
            <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-blue-400 rounded-full transform -translate-x-1/2"></div>
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: "6s", animationDirection: "reverse" }}>
            <div className="absolute top-1/2 left-0 w-1 h-1 bg-blue-300 rounded-full transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-0 w-1 h-1 bg-blue-300 rounded-full transform -translate-y-1/2"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2 font-mono">
            Initializing Systems
          </h2>
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="flex justify-between text-sm text-gray-400 mb-2 font-mono">
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 relative overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-300 relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        <div className="mt-6 text-sm text-gray-400 font-mono h-5">
          {progress < 25 && "Connecting to servers..."}
          {progress >= 25 && progress < 50 && "Loading assets..."}
          {progress >= 50 && progress < 75 && "Initializing components..."}
          {progress >= 75 && progress < 95 && "Finalizing setup..."}
          {progress >= 95 && "Ready to launch!"}
        </div>
      </div>

      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-transparent to-transparent"></div>
    </div>
  );
};

export default LoadingScreen;
