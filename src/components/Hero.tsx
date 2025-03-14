
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import SplitScreenTransition from "./SplitScreenTransition";

// Curated set of common Arabic letters for the animation
const arabicChars = "ابتثجحخدذرزسشصضطظعغفقكلمنهوي";
const finalText = "I design and code beautifully simple things, and I love what I do.";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [decodedText, setDecodedText] = useState("");
  const textRef = useRef<HTMLParagraphElement>(null);
  const decodeStarted = useRef(false);
  const [transitionActive, setTransitionActive] = useState(false);
  const [transitionOrigin, setTransitionOrigin] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isVisible && !decodeStarted.current) {
      decodeStarted.current = true;
      
      // Start with random Arabic characters, preserving spaces
      const initialRandomText = Array.from(finalText).map(char => 
        char === ' ' ? ' ' : arabicChars.charAt(Math.floor(Math.random() * arabicChars.length))
      ).join('');
      
      setDecodedText(initialRandomText);

      // Character-by-character decoding animation
      // Moving left-to-right despite RTL context
      let position = 0;
      const interval = setInterval(() => {
        if (position >= finalText.length) {
          clearInterval(interval);
          return;
        }

        setDecodedText(prev => {
          const arr = prev.split('');
          arr[position] = finalText[position];
          
          // Randomize remaining Arabic characters that haven't been decoded yet
          for (let i = position + 1; i < arr.length; i++) {
            if (arr[i] !== ' ') {
              arr[i] = arabicChars.charAt(Math.floor(Math.random() * arabicChars.length));
            }
          }
          
          return arr.join('');
        });

        position++;
      }, 70); // Adjust speed here (lower = faster)

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Get button position for transition origin
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setTransitionOrigin({ x: centerX, y: centerY });
    }
    
    // Activate transition
    setTransitionActive(true);
  };

  return (
    <div className="relative min-h-screen bg-[#010F18] overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/lovable-uploads/bafdc1e7-7019-4c27-9796-40ab46b25a1d.png"
          alt="Hero Background"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#010F18]" />
      </div>

      {/* Split Screen Transition */}
      <SplitScreenTransition 
        isActive={transitionActive}
        targetPath="/contact"
        originX={transitionOrigin.x}
        originY={transitionOrigin.y}
      />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`space-y-6 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-mono animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
                Abdifatah Osman
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 font-mono">
                Systems Engineer | Mobile & Game Developer
              </p>
            </div>
            
            <p 
              ref={textRef}
              className="text-lg text-gray-300 w-full lg:max-w-2xl font-mono"
              dir="ltr" // Ensure left-to-right orientation
            >
              {decodedText}
            </p>
            
            <Link 
              ref={buttonRef}
              to="/contact" 
              onClick={handleButtonClick}
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
