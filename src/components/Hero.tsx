import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ParticlesBackground } from "./ParticlesBackground";

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cosmic Particles Background */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-background/30 to-background/80" />

      {/* Subtle Ambient Glow Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center space-y-8 max-w-5xl mx-auto">
          {/* Main Name - Hero Title with Animated Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <span 
              className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none animated-gradient-text"
              style={{
                fontFamily: "'Poppins', 'Montserrat', sans-serif",
              }}
            >
              Madhu Karthick A
            </span>
          </motion.h1>

          {/* Subtitles - Professional Titles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            className="space-y-3"
          >
            <p 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-muted-foreground tracking-wide"
              style={{
                fontFamily: "'Poppins', 'Montserrat', sans-serif",
              }}
            >
              Programmer <span className="text-primary/60">|</span> AI Explorer
            </p>
            <p 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-muted-foreground tracking-wide"
              style={{
                fontFamily: "'Poppins', 'Montserrat', sans-serif",
              }}
            >
              Cyber Security Enthusiast
            </p>
          </motion.div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ 
            y: [0, 15, 0],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="cursor-pointer group"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronDown className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
};
