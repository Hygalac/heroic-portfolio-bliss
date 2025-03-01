
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import BackgroundAnimation from "@/components/skills/BackgroundAnimation";
import { toast } from "@/hooks/use-toast";
import { ArrowUp, Mail, Github, Linkedin, BookOpen } from "lucide-react";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-grow relative overflow-hidden py-16 lg:py-24 px-4">
        {/* Background animation */}
        <BackgroundAnimation opacity={0.06} />

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left column - Image and info */}
            <div className="flex flex-col items-center lg:items-start">
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

              <h1 className="text-4xl font-bold mb-4 text-center lg:text-left">Get In Touch</h1>
              <p className="text-lg mb-8 text-gray-300 max-w-md text-center lg:text-left">
                I'm always open to new opportunities and collaborations. Feel free to reach out!
              </p>

              {/* Social links */}
              <div className="flex gap-4 mb-10">
                <a 
                  href="mailto:contact@abdifatahosman.com" 
                  className="p-2 rounded-full border border-blue-500/50 hover:bg-blue-500/20 transition-all hover:scale-110 hover:shadow-glow"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-full border border-blue-500/50 hover:bg-blue-500/20 transition-all hover:scale-110 hover:shadow-glow"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com/" 
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
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-blue-950/30 border border-blue-500/30 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-blue-950/30 border border-blue-500/30 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-blue-950/30 border border-blue-500/30 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-all hover:animate-button-glow"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600/80 hover:bg-blue-700 shadow-lg transition-all hover:scale-110 hover:shadow-blue-500/30 backdrop-blur-sm z-20"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      </div>

      <Footer />
    </main>
  );
};

export default Contact;
