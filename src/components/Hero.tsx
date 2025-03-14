
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

// Curated set of common Arabic letters for the animation
const arabicChars = "ابتثجحخدذرزسشصضطظعغفقكلمنهوي";
const finalHeading = "Abdifatah Osman";
const finalSubheading = "Systems Engineer | Mobile & Game Developer";
const finalText = "I design and code beautifully simple things, and I love what I do.";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [decodedHeading, setDecodedHeading] = useState("");
  const [decodedSubheading, setDecodedSubheading] = useState("");
  const [decodedText, setDecodedText] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const decodeStarted = useRef(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isVisible && !decodeStarted.current) {
      decodeStarted.current = true;
      
      // Initialize with random Arabic characters, preserving spaces
      const initialRandomHeading = Array.from(finalHeading).map(char => 
        char === ' ' ? ' ' : arabicChars.charAt(Math.floor(Math.random() * arabicChars.length))
      ).join('');
      
      const initialRandomSubheading = Array.from(finalSubheading).map(char => 
        char === ' ' ? ' ' : arabicChars.charAt(Math.floor(Math.random() * arabicChars.length))
      ).join('');
      
      const initialRandomText = Array.from(finalText).map(char => 
        char === ' ' ? ' ' : arabicChars.charAt(Math.floor(Math.random() * arabicChars.length))
      ).join('');
      
      setDecodedHeading(initialRandomHeading);
      setDecodedSubheading(initialRandomSubheading);
      setDecodedText(initialRandomText);

      // Decode heading first
      let headingPosition = 0;
      const headingInterval = setInterval(() => {
        if (headingPosition >= finalHeading.length) {
          clearInterval(headingInterval);
          // Start subheading animation after heading is done
          decodeSubheading();
          return;
        }

        setDecodedHeading(prev => {
          const arr = prev.split('');
          arr[headingPosition] = finalHeading[headingPosition];
          
          // Randomize remaining Arabic characters
          for (let i = headingPosition + 1; i < arr.length; i++) {
            if (arr[i] !== ' ') {
              arr[i] = arabicChars.charAt(Math.floor(Math.random() * arabicChars.length));
            }
          }
          
          return arr.join('');
        });

        headingPosition++;
      }, 70);

      const decodeSubheading = () => {
        let subheadingPosition = 0;
        const subheadingInterval = setInterval(() => {
          if (subheadingPosition >= finalSubheading.length) {
            clearInterval(subheadingInterval);
            // Start main text animation after subheading is done
            decodeMainText();
            return;
          }

          setDecodedSubheading(prev => {
            const arr = prev.split('');
            arr[subheadingPosition] = finalSubheading[subheadingPosition];
            
            // Randomize remaining Arabic characters
            for (let i = subheadingPosition + 1; i < arr.length; i++) {
              if (arr[i] !== ' ') {
                arr[i] = arabicChars.charAt(Math.floor(Math.random() * arabicChars.length));
              }
            }
            
            return arr.join('');
          });

          subheadingPosition++;
        }, 40); // Slightly faster for subheading
      };

      const decodeMainText = () => {
        let textPosition = 0;
        const textInterval = setInterval(() => {
          if (textPosition >= finalText.length) {
            clearInterval(textInterval);
            return;
          }

          setDecodedText(prev => {
            const arr = prev.split('');
            arr[textPosition] = finalText[textPosition];
            
            // Randomize remaining Arabic characters
            for (let i = textPosition + 1; i < arr.length; i++) {
              if (arr[i] !== ' ') {
                arr[i] = arabicChars.charAt(Math.floor(Math.random() * arabicChars.length));
              }
            }
            
            return arr.join('');
          });

          textPosition++;
        }, 50); // Medium speed for main text
      };

      return () => {
        clearInterval(headingInterval);
      };
    }
  }, [isVisible]);

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

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`space-y-6 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
            <div className="space-y-2">
              <h1 
                ref={headingRef}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-mono"
                dir="ltr"
              >
                {decodedHeading}
              </h1>
              <p 
                ref={subheadingRef}
                className="text-xl sm:text-2xl text-blue-100 font-mono whitespace-nowrap overflow-hidden text-ellipsis"
                dir="ltr"
              >
                {decodedSubheading}
              </p>
            </div>
            
            <p 
              ref={textRef}
              className="text-lg text-gray-300 w-full lg:max-w-2xl font-mono whitespace-nowrap overflow-hidden text-ellipsis"
              dir="ltr"
            >
              {decodedText}
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
