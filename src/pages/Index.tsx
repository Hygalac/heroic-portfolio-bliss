
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import AboutMe from "@/components/AboutMe";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-[#010F18]">
      <Hero />
      <Projects />
      <AboutMe />
      <Skills />
      <Footer />
    </main>
  );
};

export default Index;
