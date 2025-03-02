
import React from "react";
import { Github, Linkedin, BookOpen, ArrowUp, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import BackgroundAnimation from "./skills/BackgroundAnimation";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative py-16 overflow-hidden bg-[#010F18] border-t border-blue-900/20">
      {/* Background animations */}
      <BackgroundAnimation />

      <div className="container relative z-10 px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Personal info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-2 text-xl font-bold">Abdifatah Osman</h3>
            <p className="text-sm text-gray-400">© 2025 Abdifatah Osman. All rights reserved.</p>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col items-center">
            <h3 className="mb-4 font-semibold">Navigation</h3>
            <div className="flex flex-col space-y-2">
              <a 
                href="#" 
                className="transition-all duration-300 hover:text-blue-400 hover:translate-x-1"
              >
                About
              </a>
              <a 
                href="#projects" 
                className="transition-all duration-300 hover:text-blue-400 hover:translate-x-1"
              >
                Projects
              </a>
              <a 
                href="#skills" 
                className="transition-all duration-300 hover:text-blue-400 hover:translate-x-1"
              >
                Skills
              </a>
              <Link 
                to="/contact" 
                className="transition-all duration-300 hover:text-blue-400 hover:translate-x-1"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Social & contact */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="mb-4 font-semibold">Connect</h3>
            
            {/* Social icons */}
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://github.com/AbdifatahOsman2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 transition-all duration-300 rounded-full hover:bg-blue-900/30 hover:scale-110 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              >
                <Github size={20} className="text-gray-300 hover:text-white" />
              </a>
              <a 
                href="https://www.linkedin.com/in/abdifatah-o-51552b180/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 transition-all duration-300 rounded-full hover:bg-blue-900/30 hover:scale-110 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              >
                <Linkedin size={20} className="text-gray-300 hover:text-white" />
              </a>
              <a 
                href="https://blog.example.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 transition-all duration-300 rounded-full hover:bg-blue-900/30 hover:scale-110 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              >
                <BookOpen size={20} className="text-gray-300 hover:text-white" />
              </a>
            </div>
            
            {/* Contact email */}
            <a 
              href="mailto:abdifatahosman205@gmail.com" 
              className="flex items-center space-x-2 text-gray-300 transition-all duration-300 hover:text-blue-400"
            >
              <Mail size={16} />
              <span>abdifatahosman205@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Back to top button */}
        <div className="flex justify-center mt-12">
          <button 
            onClick={scrollToTop}
            className="p-3 transition-all duration-300 border border-blue-900/50 rounded-full animate-pulse hover:animate-none hover:bg-blue-900/30 hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            aria-label="Back to top"
          >
            <ArrowUp size={20} className="text-blue-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
