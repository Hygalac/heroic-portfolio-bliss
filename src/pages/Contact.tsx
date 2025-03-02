import React from "react";
import { Button } from "@/components/ui/button";
import BackgroundAnimation from "@/components/skills/BackgroundAnimation";
import { useForm, ValidationError } from '@formspree/react';
import { ArrowLeft, Mail, Github, Linkedin, BookOpen } from "lucide-react";

const Contact = () => {
  const [state, handleSubmit] = useForm("xbldnork");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-16 px-4">
      {/* Background animation */}
      <BackgroundAnimation opacity={0.06} />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left column - Image and info */}
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              {/* Blob shape behind image */}
              <div 
                className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl animate-pulse" 
                style={{ filter: "blur(30px)" }}
              ></div>
              
              {/* Wavy outline */}
              <div className="absolute -inset-1 border-2 border-blue-400/50 rounded-full animate-breathe"></div>
              
              {/* Profile image */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-blue-500/50">
                <img
                  src="/lovable-uploads/1582459f-92ed-49d0-a665-6a03dfb389a7.png"
                  alt="Abdifatah Osman"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4 text-center">Get In Touch</h1>
            <p className="text-lg mb-8 text-gray-300 max-w-md text-center">
              I'm always open to new opportunities and collaborations. Feel free to reach out!
            </p>

            {/* Social links */}
            <div className="flex gap-4 mb-10">
              <a 
                href="mailto:abdifatahosman205@gmail.com" 
                className="p-2 rounded-full border border-blue-500/50 hover:bg-blue-500/20 transition-all hover:scale-110 hover:shadow-glow"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/AbdifatahOsman2" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full border border-blue-500/50 hover:bg-blue-500/20 transition-all hover:scale-110 hover:shadow-glow"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/abdifatah-o-51552b180/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full border border-blue-500/50 hover:bg-blue-500/20 transition-all hover:scale-110 hover:shadow-glow"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="/blog" 
                className="p-2 rounded-full border border-blue-500/50 hover:bg-blue-500/20 transition-all hover:scale-110 hover:shadow-glow"
                aria-label="Blog"
              >
                <BookOpen className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right column - Form */}
          <div className="bg-blue-950/20 rounded-xl p-6 backdrop-blur-sm border border-blue-500/20 shadow-xl hover:shadow-blue-500/5 transition-all">
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
            
            {state.succeeded ? (
              <div className="text-center py-10">
                <h3 className="text-xl font-medium text-green-400 mb-4">Message Sent!</h3>
                <p className="text-gray-300 mb-6">Thank you for reaching out. I'll get back to you soon.</p>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = "/"} 
                  className="inline-flex items-center gap-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                >
                  <ArrowLeft size={16} />
                  Back Home
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-blue-950/30 border border-blue-500/30 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-sm mt-1" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-blue-950/30 border border-blue-500/30 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-sm mt-1" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-blue-950/30 border border-blue-500/30 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  ></textarea>
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-sm mt-1" />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={state.submitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-all hover:animate-button-glow"
                >
                  {state.submitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
