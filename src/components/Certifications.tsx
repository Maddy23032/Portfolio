import { motion, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap, X } from "lucide-react";
import { useState, useRef } from "react";

interface NPTELCourse {
  title: string;
  score: number;
}

interface Insignia {
  id: string;
  title: string;
  fullTitle: string;
  logo: string;
  side: 'left' | 'right';
  glowColor: string;
  courses?: NPTELCourse[];
  certImage?: string; // Full certificate image for modal
}

export const Certifications = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hoveredInsignia, setHoveredInsignia] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [modalOrigin, setModalOrigin] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const insignias: Insignia[] = [
    {
      id: "oracle",
      title: "Oracle",
      fullTitle: "Oracle Certified Professional: OCI 2024 Generative AI Certified Professional",
      logo: "/oci.png",
      certImage: "/oci.png", // Full certificate image
      side: 'left',
      glowColor: "#f7bc40",
    },
    {
      id: "eccouncil",
      title: "EC-Council",
      fullTitle: "EC-Council: Ethical Hacking Essentials (EHE)v1",
      logo: "/ethical hacking essentials.png",
      certImage: "/ethical hacking essentials.png", // Full certificate image
      side: 'right',
      glowColor: "#5e92f3",
    },
    {
      id: "nptel",
      title: "NPTEL",
      fullTitle: "NPTEL-ELITE Certifications",
      logo: "/nptel-logo.png",
      side: 'left',
      glowColor: "#ba68c8",
      courses: [
        {
          title: "Programming, Data Structures and Algorithms using Python",
          score: 60,
        },
        {
          title: "Introduction to Machine Learning",
          score: 60,
        },
        {
          title: "Blockchain and its Applications",
          score: 70,
        },
      ],
    },
  ];

  // Handle click on Oracle/EC-Council nodes to open modal
  const handleNodeClick = (insigniaId: string, event: React.MouseEvent) => {
    const insignia = insignias.find(i => i.id === insigniaId);
    if (insignia && insignia.certImage) {
      const rect = event.currentTarget.getBoundingClientRect();
      setModalOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
      setOpenModal(insigniaId);
    }
  };

  const closeModal = () => {
    setOpenModal(null);
  };

  return (
    <section id="certifications" className="py-32 pb-64 relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-stellar glow-purple">My Certifications</span>
          </motion.h2>
          
          <motion.p
            className="text-center text-muted-foreground text-xl mb-20 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Professional certifications and continuous learning achievements
          </motion.p>

          {/* Certifications Timeline Container */}
          <div className="relative max-w-5xl mx-auto py-12">
            {/* Central Starlight Path */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 md:block hidden">
              {/* Background static path */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-secondary/20 to-accent/20 blur-sm" />
              
              {/* Animated drawing path */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <motion.line
                  x1="50%"
                  y1="0"
                  x2="50%"
                  y2="100%"
                  stroke="url(#pathGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(247, 188, 64, 0.8))',
                  }}
                />
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f7bc40" />
                    <stop offset="50%" stopColor="#5e92f3" />
                    <stop offset="100%" stopColor="#ba68c8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Pulsing light traveling down the path */}
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-primary left-1/2 -translate-x-1/2"
                style={{
                  boxShadow: '0 0 20px #f7bc40, 0 0 40px #f7bc40',
                  top: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Certification Nodes */}
            <div className="relative flex flex-col space-y-12 md:space-y-64">
              {insignias.map((insignia, index) => {
                const isHovered = hoveredInsignia === insignia.id;
                const isNPTEL = insignia.id === "nptel";
                const isLeft = insignia.side === 'left';
                
                return (
                  <motion.div
                    key={insignia.id}
                    className="relative min-h-[200px] flex flex-col md:block items-center"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.3, duration: 0.8 }}
                  >
                    {/* Node on central path - Hidden on mobile, shown on desktop */}
                    <motion.div
                      className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ 
                        delay: 1 + index * 0.3, 
                        duration: 0.5,
                        type: "spring",
                      }}
                      onMouseEnter={() => !isNPTEL && setHoveredInsignia(insignia.id)}
                      onMouseLeave={() => !isNPTEL && setHoveredInsignia(null)}
                      onClick={(e) => !isNPTEL && handleNodeClick(insignia.id, e)}
                    >
                      {/* Outer glow ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          width: '40px',
                          height: '40px',
                          background: `radial-gradient(circle, ${insignia.glowColor}80, transparent)`,
                          filter: 'blur(12px)',
                        }}
                        animate={{
                          scale: isHovered ? [1, 1.5, 1] : [1, 1.2, 1],
                          opacity: isHovered ? [0.8, 1, 0.8] : [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Central node */}
                      <motion.div
                        className="relative w-6 h-6 rounded-full cursor-pointer"
                        style={{
                          background: `radial-gradient(circle, ${insignia.glowColor}, ${insignia.glowColor}80)`,
                          border: `2px solid ${insignia.glowColor}`,
                          boxShadow: isHovered 
                            ? `0 0 30px ${insignia.glowColor}, inset 0 0 10px ${insignia.glowColor}`
                            : `0 0 15px ${insignia.glowColor}80`,
                        }}
                        whileHover={{ scale: 1.3 }}
                      >
                        {/* Inner pulse */}
                        <motion.div
                          className="absolute inset-1 rounded-full"
                          style={{ backgroundColor: insignia.glowColor }}
                          animate={{
                            opacity: [1, 0.5, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </motion.div>

                      {/* Pulsing ring on hover */}
                      {isHovered && (
                        <motion.div
                          className="absolute inset-0 w-6 h-6 rounded-full"
                          style={{
                            border: `2px solid ${insignia.glowColor}`,
                          }}
                          initial={{ scale: 1, opacity: 1 }}
                          animate={{ scale: 2.5, opacity: 0 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                      )}
                    </motion.div>

                    {/* Connecting line to insignia - Hidden on mobile */}
                    <motion.div
                      className="hidden md:block absolute top-1/2 -translate-y-1/2 h-0.5"
                      style={{
                        left: isLeft ? 'calc(50% - 150px)' : '50%',
                        right: isLeft ? '50%' : 'calc(50% - 150px)',
                        background: `linear-gradient(${isLeft ? '90deg' : '-90deg'}, ${insignia.glowColor}00, ${insignia.glowColor}80, ${insignia.glowColor}00)`,
                        boxShadow: isHovered ? `0 0 10px ${insignia.glowColor}` : 'none',
                      }}
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: 1 } : {}}
                      transition={{ 
                        delay: 1.2 + index * 0.3, 
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                    >
                      {/* Energy pulse along line */}
                      {isHovered && (
                        <motion.div
                          className="absolute top-0 w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: insignia.glowColor,
                            boxShadow: `0 0 15px ${insignia.glowColor}`,
                            [isLeft ? 'right' : 'left']: '0',
                            top: '50%',
                            transform: 'translateY(-50%)',
                          }}
                          animate={{
                            [isLeft ? 'right' : 'left']: ['0%', '100%'],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      )}
                    </motion.div>

                    {/* Insignia - Centered on mobile, alternating on desktop */}
                    <motion.div
                      className={`relative md:absolute top-0 md:top-1/2 md:-translate-y-1/2 cursor-pointer ${
                        isLeft ? 'md:right-1/2 md:mr-[170px]' : 'md:left-1/2 md:ml-[170px]'
                      }`}
                      initial={{ opacity: 0, x: isLeft ? -50 : 50, scale: 0.8 }}
                      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                      transition={{ 
                        delay: 1.4 + index * 0.3, 
                        duration: 0.8,
                        type: "spring",
                      }}
                      onMouseEnter={() => setHoveredInsignia(insignia.id)}
                      onMouseLeave={() => setHoveredInsignia(null)}
                      onClick={(e) => !isNPTEL && handleNodeClick(insignia.id, e)}
                    >
                      {/* Floating animation wrapper */}
                      <motion.div
                        animate={{
                          y: isHovered ? 0 : [0, -10, 0],
                        }}
                        transition={{
                          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                        }}
                      >
                        {/* Outer glow */}
                        <motion.div
                          className="absolute inset-0 rounded-full blur-2xl"
                          style={{
                            background: `radial-gradient(circle, ${insignia.glowColor}60, transparent)`,
                            width: '180px',
                            height: '180px',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                          }}
                          animate={{
                            scale: isHovered ? [1, 1.3, 1] : [1, 1.1, 1],
                            opacity: isHovered ? [0.6, 1, 0.6] : [0.4, 0.6, 0.4],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />

                        {/* Insignia Badge */}
                        <motion.div
                          className="relative w-28 h-28 rounded-full bg-card/60 backdrop-blur-md border-2 flex items-center justify-center overflow-hidden"
                          style={{
                            borderColor: insignia.glowColor,
                            boxShadow: isHovered 
                              ? `0 0 40px ${insignia.glowColor}, inset 0 0 20px ${insignia.glowColor}30`
                              : `0 0 20px ${insignia.glowColor}50`,
                          }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {/* Logo */}
                          {isNPTEL ? (
                            <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5">
                              <GraduationCap 
                                className="w-14 h-14" 
                                style={{ color: insignia.glowColor }}
                              />
                            </div>
                          ) : (
                            <img
                              src={insignia.logo}
                              alt={insignia.title}
                              className="w-full h-full object-contain p-3"
                              style={{
                                filter: isHovered 
                                  ? `brightness(1.3) drop-shadow(0 0 10px ${insignia.glowColor})`
                                  : 'brightness(1.1)',
                              }}
                            />
                          )}

                          {/* Rotating border */}
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: `conic-gradient(from 0deg, transparent, ${insignia.glowColor}60, transparent)`,
                            }}
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        </motion.div>

                        {/* Title below insignia */}
                        <motion.div
                          className="text-center mt-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.6 + index * 0.3 }}
                        >
                          <p 
                            className="font-bold text-lg"
                            style={{ color: insignia.glowColor }}
                          >
                            {insignia.title}
                          </p>
                        </motion.div>
                      </motion.div>

                      {/* Tooltip / Data Panel - Only for NPTEL */}
                      {isHovered && isNPTEL && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, x: isLeft ? -20 : 20 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          className="absolute top-1/2 -translate-y-[70%] left-full ml-6"
                          style={{
                            width: '480px',
                            pointerEvents: 'none',
                            maxHeight: '500px',
                          }}
                        >
                          {/* NPTEL Detailed Panel */}
                          <div 
                              className="bg-card/95 backdrop-blur-md border-2 rounded-xl p-6 neon-border shadow-2xl max-h-[480px] overflow-y-auto"
                              style={{
                                borderColor: insignia.glowColor,
                                boxShadow: `0 0 40px ${insignia.glowColor}50`,
                              }}
                            >
                              <h4 
                                className="text-xl font-bold mb-5 text-center sticky top-0 bg-card/95 pb-2 z-10"
                                style={{ color: insignia.glowColor }}
                              >
                                {insignia.fullTitle}
                              </h4>
                              
                              <div className="space-y-4 pr-2">
                                {insignia.courses?.map((course, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -15 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                                    className="bg-background/60 rounded-lg p-4 border border-accent/30"
                                  >
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                      <p className="text-sm font-medium text-foreground leading-tight flex-1">
                                        {course.title}
                                      </p>
                                      <span 
                                        className="text-xl font-bold shrink-0"
                                        style={{ color: insignia.glowColor }}
                                      >
                                        {course.score}%
                                      </span>
                                    </div>
                                    
                                    {/* Progress Bar */}
                                    <div className="w-full h-2 bg-background/80 rounded-full overflow-hidden">
                                      <motion.div
                                        className="h-full rounded-full"
                                        style={{ 
                                          background: `linear-gradient(90deg, ${insignia.glowColor}, ${insignia.glowColor}cc)`,
                                          boxShadow: `0 0 10px ${insignia.glowColor}80`,
                                        }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${course.score}%` }}
                                        transition={{ delay: idx * 0.1 + 0.2, duration: 1, ease: "easeOut" }}
                                      />
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Decorative stardust particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`dust-${i}`}
                className="absolute w-1 h-1 rounded-full bg-white"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
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
            className="text-center text-muted-foreground mt-16 text-sm"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 2, duration: 0.8 }}
          >
            🌟 Click on Oracle/EC-Council to view certificate • Hover over NPTEL for course details
          </motion.p>
        </motion.div>
      </div>

      {/* Emerging Credentials Modal */}
      <AnimatePresence>
        {openModal && (
          <>
            {/* Dark Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/90 z-50"
              onClick={closeModal}
            />

            {/* Certificate Image - Emerging Animation */}
            <motion.div
              initial={{
                x: modalOrigin.x - window.innerWidth / 2,
                y: modalOrigin.y - window.innerHeight / 2,
                scale: 0.1,
                opacity: 0,
              }}
              animate={{
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
              }}
              exit={{
                x: modalOrigin.x - window.innerWidth / 2,
                y: modalOrigin.y - window.innerHeight / 2,
                scale: 0.1,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                duration: 0.6,
              }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              {/* Certificate Container */}
              <motion.div
                className="relative bg-card/10 backdrop-blur-sm rounded-xl p-2 border-2 max-w-5xl w-full pointer-events-auto"
                style={{
                  borderColor: insignias.find(i => i.id === openModal)?.glowColor,
                  boxShadow: `0 0 60px ${insignias.find(i => i.id === openModal)?.glowColor}80`,
                }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Flare Effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: `radial-gradient(circle at center, ${insignias.find(i => i.id === openModal)?.glowColor}40, transparent 70%)`,
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Certificate Image */}
                <img
                  src={insignias.find(i => i.id === openModal)?.certImage}
                  alt={`${insignias.find(i => i.id === openModal)?.fullTitle} Certificate`}
                  className="relative z-10 w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
              </motion.div>
            </motion.div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              onClick={closeModal}
              className="fixed top-8 right-8 z-[60] w-14 h-14 rounded-full bg-card/80 backdrop-blur-md border-2 flex items-center justify-center cursor-pointer group hover:scale-110 transition-transform"
              style={{
                borderColor: insignias.find(i => i.id === openModal)?.glowColor,
                boxShadow: `0 0 30px ${insignias.find(i => i.id === openModal)?.glowColor}60`,
              }}
            >
              <X 
                className="w-7 h-7" 
                style={{ color: insignias.find(i => i.id === openModal)?.glowColor }}
              />
              
              {/* Pulse ring on hover */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: `2px solid ${insignias.find(i => i.id === openModal)?.glowColor}` }}
                initial={{ scale: 1, opacity: 0 }}
                whileHover={{ scale: 1.5, opacity: [0.8, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
