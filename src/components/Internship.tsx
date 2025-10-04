import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, Code, Zap } from "lucide-react";
import { useState, useEffect } from "react";

// Typewriter Component
const TypewriterText = ({ 
  text, 
  delay = 0, 
  speed = 30,
  onComplete,
  shouldReset = false
}: { 
  text: string; 
  delay?: number; 
  speed?: number;
  onComplete?: () => void;
  shouldReset?: boolean;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Reset effect when shouldReset changes
  useEffect(() => {
    if (shouldReset) {
      setDisplayedText("");
      setCurrentIndex(0);
      setIsTyping(false);
      setShowCursor(true);
    }
  }, [shouldReset]);

  useEffect(() => {
    // Start typing after delay
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      setShowCursor(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay, shouldReset]);

  useEffect(() => {
    if (!isTyping || currentIndex >= text.length) {
      if (currentIndex >= text.length && onComplete) {
        onComplete();
      }
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText(text.slice(0, currentIndex + 1));
      setCurrentIndex(currentIndex + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, isTyping, text, speed, onComplete]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {displayedText}
      {isTyping && currentIndex < text.length && (
        <span className="text-primary animate-pulse">|</span>
      )}
      {currentIndex >= text.length && showCursor && (
        <span className="text-primary">|</span>
      )}
    </span>
  );
};

export const Internship = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [isDecrypting, setIsDecrypting] = useState(false);
  const [startLine2, setStartLine2] = useState(false);
  const [line2Complete, setLine2Complete] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  // Reset the typewriter after 45 seconds when both lines complete
  useEffect(() => {
    if (line2Complete) {
      const resetTimeout = setTimeout(() => {
        setStartLine2(false);
        setLine2Complete(false);
        setResetKey(prev => prev + 1); // Trigger reset by changing key
      }, 45000); // 45 seconds

      return () => clearTimeout(resetTimeout);
    }
  }, [line2Complete]);

  return (
    <section id="internship" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-stellar glow-teal">Internship</span>
          </motion.h2>
          
          <motion.p
            className="text-center text-muted-foreground text-xl mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Industry expedition & real-world deployment
          </motion.p>

          {/* Holographic Mission Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: -20 }}
            animate={inView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
            transition={{ delay: 0.6, duration: 1, type: "spring" }}
            className="relative"
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            onMouseEnter={() => setIsDecrypting(true)}
          >
            <div className="bg-card/40 backdrop-blur-md rounded-2xl border-2 border-primary/50 p-8 md:p-12 neon-border card-glow relative overflow-hidden">
              {/* Animated Circuit Lines Background */}
              <div className="absolute inset-0 opacity-10">
                <motion.div
                  className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary to-transparent"
                  animate={{
                    x: ['100%', '-100%'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Mission Patch */}
              <motion.div
                className="absolute top-6 right-6 w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center"
                animate={{
                  rotate: 360,
                  boxShadow: [
                    '0 0 20px rgba(247, 188, 64, 0.3)',
                    '0 0 40px rgba(247, 188, 64, 0.6)',
                    '0 0 20px rgba(247, 188, 64, 0.3)',
                  ],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <Briefcase className="w-8 h-8 text-primary" />
              </motion.div>

              {/* Company Header */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Code className="w-6 h-6 text-secondary" />
                  <h3 className="text-3xl font-bold text-stellar glow-purple">
                    ZOHO CRM Developer
                  </h3>
                </div>
                <p className="text-xl text-primary glow-teal">
                  Euro Exim Services Pvt. Ltd
                </p>
              </motion.div>

              {/* Terminal-style Responsibilities */}
              <div className="space-y-4 font-mono">
                {/* Line 1 - Typewriter Animation */}
                {inView && (
                  <motion.div
                    key={`line1-${resetKey}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.3 }}
                    className="flex items-start gap-3 group"
                  >
                    <span className="text-primary text-xl mt-1">&gt;</span>
                    <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                      <TypewriterText 
                        text="Developed CRM systems and dynamic dashboards to manage customer data efficiently."
                        delay={1500}
                        speed={30}
                        onComplete={() => setStartLine2(true)}
                        shouldReset={resetKey > 0}
                      />
                    </p>
                    <Zap className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:animate-pulse-glow transition-opacity mt-1" />
                  </motion.div>
                )}

                {/* Line 2 - Typewriter Animation (starts after Line 1 completes) */}
                {inView && startLine2 && (
                  <motion.div
                    key={`line2-${resetKey}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-3 group"
                  >
                    <span className="text-secondary text-xl mt-1">&gt;</span>
                    <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                      <TypewriterText 
                        text="With the help of Deluge Script automated the workflow process ultimately improving customer satisfaction."
                        delay={200}
                        speed={30}
                        onComplete={() => setLine2Complete(true)}
                        shouldReset={resetKey > 0}
                      />
                    </p>
                    <Zap className="w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 group-hover:animate-pulse-glow transition-opacity mt-1" />
                  </motion.div>
                )}
              </div>

              {/* Status Indicator */}
              <motion.div
                className="mt-8 flex items-center gap-2 text-sm text-primary"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.6, duration: 0.8 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="font-mono">MISSION STATUS: SUCCESSFULLY COMPLETED</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
