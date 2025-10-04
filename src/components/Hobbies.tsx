import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface Hobby {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  glowColor: string;
  profileLink?: string;
  logoPath?: string;
}

export const Hobbies = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const hobbies: Hobby[] = [
    {
      id: "dsa",
      title: "Problem Solving & DSA",
      description: "Fueled by the challenge of solving complex data structure and algorithm problems on LeetCode.",
      imagePath: "/Leetcode.png",
      glowColor: "#f7bc40",
      profileLink: "https://leetcode.com/u/Madhu_Karthick/",
      logoPath: "/leetcode (1).svg",
    },
    {
      id: "vibecoding",
      title: "Coding to the Rhythm",
      description: "I find my coding zen and maintain deep focus by synchronizing with lofi beats and ambient tracks.",
      imagePath: "/vibecoding.jpeg",
      glowColor: "#5e92f3",
    },
    {
      id: "typeracing",
      title: "High-Speed Keystrokes",
      description: "Enjoying the thrill of competitive typing on platforms like Typeracer, always aiming for a new personal best in speed and accuracy.",
      imagePath: "/Typeracer.png",
      glowColor: "#ba68c8",
      profileLink: "https://monkeytype.com/profile/MadhuKarthick",
      logoPath: "/monkeytype (1).svg",
    },
    {
      id: "anime",
      title: "Animated Worlds",
      description: "Drawn to the compelling narratives, intricate world-building, and unique art styles of Japanese animation.",
      imagePath: "/anime.jpg",
      glowColor: "#f7bc40",
    },
    {
      id: "astronomy",
      title: "Astronomy",
      description: "A lifelong fascination with the cosmos, from the beauty of distant galaxies to the planets in our own backyard.",
      imagePath: "/astronomy.jpg",
      glowColor: "#5e92f3",
    },
    {
      id: "cricket",
      title: "Strategy & Teamwork",
      description: "Beyond the screen, I am passionate about the game of strategy, precision, and teamwork that is Cricket.",
      imagePath: "/cricket.jpeg",
      glowColor: "#ba68c8",
    },
    {
      id: "selfhelp",
      title: "Growth Mindset",
      description: "Committed to continuous learning and personal development through insightful books, articles, and content.",
      imagePath: "/self-help.jpeg",
      glowColor: "#f7bc40",
    },
  ];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % hobbies.length);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? hobbies.length - 1 : prevIndex - 1
    );
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 100;
    if (info.offset.x > swipeThreshold) {
      handlePrevious();
    } else if (info.offset.x < -swipeThreshold) {
      handleNext();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotate: direction > 0 ? 20 : -20,
      scale: 0.8,
      position: 'absolute' as const,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      position: 'absolute' as const,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotate: direction < 0 ? 20 : -20,
      scale: 0.8,
      position: 'absolute' as const,
    }),
  };

  return (
    <section id="hobbies" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section Title */}
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-stellar glow-purple">Hobbies & Interests</span>
          </motion.h2>
          
          <motion.p
            className="text-center text-muted-foreground text-xl mb-16"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Activities and passions that inspire my creativity
          </motion.p>

          {/* Card Deck Container */}
          <div className="relative max-w-5xl mx-auto min-h-[600px] flex items-center justify-center px-20">
            {/* Navigation Buttons */}
            <motion.button
              onClick={handlePrevious}
              className="absolute left-0 z-30 w-14 h-14 rounded-full bg-card/80 backdrop-blur-md border-2 border-primary/50 flex items-center justify-center hover:border-primary hover:scale-110 transition-all group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <ChevronLeft className="w-8 h-8 text-primary group-hover:text-primary/100" />
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="absolute right-0 z-30 w-14 h-14 rounded-full bg-card/80 backdrop-blur-md border-2 border-primary/50 flex items-center justify-center hover:border-primary hover:scale-110 transition-all group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <ChevronRight className="w-8 h-8 text-primary group-hover:text-primary/100" />
            </motion.button>

            {/* Card Stack */}
            <div className="relative w-full max-w-2xl" style={{ height: '500px', flexShrink: 0 }}>
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    rotate: { type: "spring", stiffness: 300, damping: 30 },
                    scale: { duration: 0.3 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  style={{ 
                    zIndex: 20,
                    width: '100%',
                    height: '100%',
                  }}
                >
                  {/* Holographic Card */}
                  <div
                    className="w-full h-full bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-xl rounded-2xl border-2 shadow-2xl relative overflow-hidden"
                    style={{
                      borderColor: hobbies[currentIndex].glowColor,
                      boxShadow: `0 0 60px ${hobbies[currentIndex].glowColor}40, inset 0 0 60px ${hobbies[currentIndex].glowColor}10`,
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      height: '100%',
                      minHeight: '500px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Card Glow Effect */}
                    <div 
                      className="absolute inset-0 opacity-20 blur-2xl"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${hobbies[currentIndex].glowColor}, transparent 70%)`,
                      }}
                    />

                    {/* Card Content */}
                    <div className="relative z-10 flex flex-col" style={{ height: '100%' }}>
                      {/* Image Container */}
                      <div
                        className="relative flex items-center justify-center overflow-hidden"
                        style={{
                          width: '100%',
                          height: '60%',
                          margin: 0,
                          padding: 0,
                          borderTopLeftRadius: '12px',
                          borderTopRightRadius: '12px',
                          backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        <img
                          src={hobbies[currentIndex].imagePath}
                          alt={hobbies[currentIndex].title}
                          style={{ 
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      </div>

                      {/* Text Content Container */}
                      <div className="flex flex-col items-center justify-between p-6" style={{ height: '50%' }}>
                        <div className="flex flex-col items-center flex-1 justify-center w-full">
                          {/* Title */}
                          <h3
                            className="text-2xl md:text-3xl font-bold mb-3 text-center"
                            style={{ 
                              color: hobbies[currentIndex].glowColor,
                              textShadow: `0 0 20px ${hobbies[currentIndex].glowColor}60`,
                              flexShrink: 0,
                            }}
                          >
                            {hobbies[currentIndex].title}
                          </h3>

                          {/* Description */}
                          <p
                            className="text-muted-foreground text-center text-base leading-relaxed mb-4"
                          >
                            {hobbies[currentIndex].description}
                          </p>

                          {/* Profile Link Button (Conditional) */}
                          {hobbies[currentIndex].profileLink && (
                            <motion.a
                              href={hobbies[currentIndex].profileLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300"
                              style={{
                                backgroundColor: `${hobbies[currentIndex].glowColor}20`,
                                color: hobbies[currentIndex].glowColor,
                                border: `2px solid ${hobbies[currentIndex].glowColor}`,
                                boxShadow: `0 0 20px ${hobbies[currentIndex].glowColor}40`,
                              }}
                              whileHover={{
                                boxShadow: `0 0 30px ${hobbies[currentIndex].glowColor}60`,
                                scale: 1.05,
                              }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {hobbies[currentIndex].logoPath && (
                                <img 
                                  src={hobbies[currentIndex].logoPath} 
                                  alt="Profile Logo"
                                  className="w-5 h-5"
                                />
                              )}
                              <span>View Profile</span>
                              <ExternalLink className="w-4 h-4" />
                            </motion.a>
                          )}
                        </div>

                        {/* Card Counter */}
                        <div
                          className="text-center text-base font-bold px-4 py-2 rounded-lg bg-background/30 backdrop-blur-sm border"
                          style={{ 
                            color: hobbies[currentIndex].glowColor,
                            borderColor: hobbies[currentIndex].glowColor,
                            boxShadow: `0 0 15px ${hobbies[currentIndex].glowColor}40`,
                            flexShrink: 0,
                          }}
                        >
                          {currentIndex + 1} / {hobbies.length}
                        </div>
                      </div>
                    </div>

                    {/* Corner Accents */}
                    <div 
                      className="absolute top-0 right-0 w-32 h-32 opacity-30"
                      style={{
                        background: `radial-gradient(circle at top right, ${hobbies[currentIndex].glowColor}, transparent)`,
                      }}
                    />
                    <div 
                      className="absolute bottom-0 left-0 w-32 h-32 opacity-30"
                      style={{
                        background: `radial-gradient(circle at bottom left, ${hobbies[currentIndex].glowColor}, transparent)`,
                      }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Background Cards (Stacked Effect) */}
              {[1, 2].map((offset) => {
                const bgIndex = (currentIndex + offset) % hobbies.length;
                return (
                  <motion.div
                    key={`bg-${offset}`}
                    className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-md rounded-2xl border border-primary/30 pointer-events-none"
                    style={{
                      zIndex: 10 - offset,
                      transform: `scale(${1 - offset * 0.05}) translateY(${offset * 20}px)`,
                      opacity: 0.6 - offset * 0.15,
                      boxShadow: `0 0 30px ${hobbies[bgIndex].glowColor}20`,
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 0.6 - offset * 0.15 } : {}}
                    transition={{ delay: 0.6 + offset * 0.1 }}
                  />
                );
              })}
            </div>

            {/* Ambient Particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full z-0"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  backgroundColor: hobbies[currentIndex].glowColor,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 2, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Interaction Hint */}
          <motion.p
            className="text-center text-muted-foreground mt-12 text-sm"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          >
            ← Swipe or use arrows to explore → • {hobbies.length} cards total
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
