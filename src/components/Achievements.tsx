import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Trophy, Code, Medal, BookOpen } from "lucide-react";
import { useState } from "react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  gradient: string;
}

export const Achievements = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const achievements: Achievement[] = [
    {
      id: "symposiums",
      title: "Coding Symposiums",
      description: "First place in multiple events including Blind Coding, Coding Relay, and competitive programming contests. Demonstrated exceptional problem-solving speed and accuracy under pressure.",
      icon: Trophy,
      color: "#f7bc40",
      gradient: "from-primary/20 to-primary/5",
    },
    {
      id: "problems",
      title: "2000+ Problems Solved",
      description: "Achieved 2000+ problem-solving milestone across platforms including Skillrack, LeetCode, HackerRank, and CodeChef. Strong foundation in algorithms and data structures.",
      icon: Code,
      color: "#5e92f3",
      gradient: "from-secondary/20 to-secondary/5",
    },
    {
      id: "hackathon",
      title: "Hackathon Winner",
      description: "Secured 3rd Prize in Internal Hackathon by developing an innovative solution. Showcased teamwork, rapid prototyping, and creative problem-solving abilities.",
      icon: Medal,
      color: "#ba68c8",
      gradient: "from-accent/20 to-accent/5",
    },
    {
      id: "hindi",
      title: "B.A. Hindi Degree",
      description: "Completed Bachelor of Arts in Hindi, demonstrating linguistic proficiency and cultural knowledge. Balancing technical expertise with humanities education.",
      icon: BookOpen,
      color: "#4dd0e1",
      gradient: "from-tertiary/20 to-tertiary/5",
    },
  ];

  const handleCardClick = (id: string) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  return (
    <section id="achievements" className="py-20 relative overflow-hidden">
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
            <span className="text-stellar glow-teal">Achievements</span>
          </motion.h2>
          
          <motion.p
            className="text-center text-muted-foreground text-xl mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Recognitions earned across the technology cosmos
          </motion.p>

          {/* Achievement Insignias Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {achievements.map((achievement, index) => {
              const isFlipped = flippedCard === achievement.id;
              
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 30, rotateY: -20 }}
                  animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                  transition={{ 
                    delay: 0.6 + index * 0.15, 
                    duration: 0.8,
                    type: "spring",
                  }}
                  className="relative h-64 cursor-pointer"
                  style={{ 
                    perspective: "1000px",
                  }}
                  onClick={() => handleCardClick(achievement.id)}
                >
                  <motion.div
                    className="relative w-full h-full"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    animate={{
                      rotateY: isFlipped ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    {/* Front Side */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} backdrop-blur-md rounded-2xl border-2 border-primary/50 p-8 flex flex-col items-center justify-center text-center neon-border card-glow`}
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: `0 0 40px ${achievement.color}40`,
                      }}
                    >
                      {/* Glowing Icon Container */}
                      <motion.div
                        className="mb-6 relative"
                        animate={{
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {/* Outer Glow Ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full blur-xl"
                          style={{ background: achievement.color }}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        
                        {/* Icon */}
                        <div 
                          className="relative w-20 h-20 rounded-full flex items-center justify-center"
                          style={{
                            background: `radial-gradient(circle, ${achievement.color}40, transparent)`,
                            border: `2px solid ${achievement.color}`,
                            boxShadow: `0 0 30px ${achievement.color}80`,
                          }}
                        >
                          <achievement.icon 
                            className="w-10 h-10" 
                            style={{ color: achievement.color }}
                          />
                        </div>
                      </motion.div>

                      {/* Title */}
                      <h3 
                        className="text-2xl font-bold mb-2"
                        style={{ color: achievement.color }}
                      >
                        {achievement.title}
                      </h3>

                      {/* Tap/Click Hint */}
                      <motion.p
                        className="text-sm text-muted-foreground mt-4"
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        Click to reveal details
                      </motion.p>

                      {/* Corner Accent */}
                      <div 
                        className="absolute top-3 right-3 w-3 h-3 rounded-full"
                        style={{
                          background: achievement.color,
                          boxShadow: `0 0 10px ${achievement.color}`,
                        }}
                      />
                    </motion.div>

                    {/* Back Side */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} backdrop-blur-md rounded-2xl border-2 p-8 flex flex-col items-center justify-center text-center neon-border card-glow`}
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        rotateY: 180,
                        borderColor: achievement.color,
                      }}
                    >
                      {/* Icon on back */}
                      <achievement.icon 
                        className="w-8 h-8 mb-4 opacity-50" 
                        style={{ color: achievement.color }}
                      />

                      {/* Description */}
                      <p 
                        className="text-base text-muted-foreground leading-relaxed"
                      >
                        {achievement.description}
                      </p>

                      {/* Decorative Elements */}
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-1"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${achievement.color}, transparent)`,
                        }}
                        animate={{
                          opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />

                      {/* Back Indicator */}
                      <motion.p
                        className="text-xs text-muted-foreground mt-6 opacity-70"
                        animate={{
                          opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        Click to flip back
                      </motion.p>
                    </motion.div>
                  </motion.div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${achievement.color}20, transparent)`,
                      opacity: 0,
                    }}
                    whileHover={{
                      opacity: 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Interaction Hint */}
          <motion.p
            className="text-center text-muted-foreground mt-12 text-sm"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            🎯 Click any insignia to reveal the full achievement story
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
