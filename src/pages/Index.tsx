import { ParticlesBackground } from "@/components/ParticlesBackground";
import { MeteorShower } from "@/components/MeteorShower";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { SkillsOrbit } from "@/components/SkillsOrbit";
import { Internship } from "@/components/Internship";
import { Certifications } from "@/components/Certifications";
import { Achievements } from "@/components/Achievements";
import { Hobbies } from "@/components/Hobbies";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Meteor Shower Background - Fixed */}
      <div className="fixed inset-0 z-0">
        <MeteorShower />
      </div>

      {/* Particles Foreground - Fixed */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticlesBackground />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content - Relative positioning for proper stacking */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Internship />
        <Projects />
        <Certifications />
        <Achievements />
        <SkillsOrbit />
        <Hobbies />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t-2 border-primary/30 bg-background/60 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-lg">
            © 2025 <span className="text-primary glow-teal">Madhu Karthick's Portfolio</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
