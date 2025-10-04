import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Cpu, Lock } from "lucide-react";

export const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const highlights = [
    {
      icon: Code2,
      title: "Problem Solving & DSA",
      description: "Strong foundation in algorithms, data structures, and competitive programming",
    },
    {
      icon: Cpu,
      title: "AI & Machine Learning",
      description: "Expertise in ML, Deep Learning, NLP, and Generative AI technologies",
    },
    {
      icon: Lock,
      title: "Cybersecurity",
      description: "Passionate about ethical hacking, threat detection, and AI-driven cloud security",
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6">
            <span className="text-stellar glow-blue">About Me</span>
          </h2>
          <p className="text-center text-muted-foreground text-xl mb-12 max-w-2xl mx-auto">
            Exploring the intersection of AI, security, and innovation
          </p>

          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-card/40 backdrop-blur-md p-10 rounded-2xl border-2 border-border card-glow mb-12 neon-border"
          >
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed space-y-6 animate-data-stream mb-6">
              A <span className="text-primary glow-teal font-semibold">Computer Science Engineer</span> with strong problem-solving skills and a background in DSA. I have hands-on experience building an <span className="text-accent glow-fuchsia font-semibold">LLM-powered RAG Q&A application</span> and an <span className="text-secondary glow-purple font-semibold">AI-driven Malware Classification system</span>. My cybersecurity background ensures a focused approach to integrity and security.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed space-y-6 animate-data-stream">
              Skilled in Generative AI and passionate about exploring <span className="text-primary glow-teal font-semibold">Ethical Hacking</span>, threat detection, and emerging technologies in AI-driven cloud security. I am dedicated to continuous learning and growth, always seeking new challenges that push the boundaries of technology and creativity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.15, duration: 0.8, type: "spring" }}
                whileHover={{ 
                  scale: 1.08, 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="bg-card/40 backdrop-blur-md p-8 rounded-xl border-2 border-border hover:border-primary transition-all duration-300 card-glow group cursor-pointer neon-border"
              >
                <motion.div 
                  className="mb-6"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className="w-12 h-12 text-primary group-hover:text-secondary transition-colors group-hover:animate-pulse-glow" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-stellar transition-all duration-300">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
