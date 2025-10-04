import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    {
      title: "Personal Wikipedia – RAG Q&A",
      description: "A Retrieval-Augmented Generation (RAG) app powered by LLMs that answers questions strictly from your own document.",
      tech: ["Python", "LLM", "RAG", "VectorDB","Ollama","Groq"],
      image: "https://i.pinimg.com/736x/48/0d/a0/480da03c101504dd40832321d9829584.jpg",
      github: "https://github.com/Maddy23032/Personal-Wikipedia",
      demo: null,
    },
    {
      title: "Custom Web Application Scanner",
      description: "Developed a Python web security scanner with both CLI and GUI support to detect critical OWASP top 10 vulnerabilities.",
      tech: ["Python", "Security", "OWASP", "Top-10","CLI/GUI"],
      image: "https://i.pinimg.com/1200x/c6/57/cf/c657cfea13e3ddc1f60fa900ce73b16b.jpg",
      github: "https://github.com/Maddy23032/CTS-Hackathon",
      demo: "https://vulnscan-nine.vercel.app/",
    },
    {
      title: "Malware Classification using Static Analysis",
      description: "Developed an AI-powered system that classifies malware families by static analysis without executing the malicious code.",
      tech: ["Python", "VirusTotal", "Malware Analysis"],
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=600&h=400&fit=crop",
      github: "https://github.com/Maddy23032/Malware-Classification",
      demo: null,
    },
    {
      title: "Fake Social Media Detection System",
      description: "Enhanced the performance of the fake social media detection system with Random Forest model upto 99.4% accuracy.",
      tech: ["Python", "Random Forest", "Ensemble Learning", "Twitter API"],
      image: "https://i.pinimg.com/1200x/af/a4/63/afa46312b0c3c9322035c584c919f424.jpg",
      github: "https://github.com/Maddy23032/Fake-Social-Media-Detection",
      demo: null,
    },
    {
      title: "Fake News Detection System",
      description: "Developed a fake news detection system using machine learning models such as logistic regression and Decision Tree Classifier. Enhanced the accuracy of the model upto 92%.",
      tech: ["Python", "Logistic Regression", "Decision Tree", "Supervised Learning"],
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop",
      github: "https://github.com/Maddy23032/Fake-news-detection",
      demo: null,
    },
    {
      title: "Recipes (FastAPI + Streamlit)",
      description: "A full-stack recipe management application built with FastAPI backend and Streamlit frontend for browsing and managing recipes.",
      tech: ["Python", "FastAPI", "Streamlit", "Sqlite"],
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop",
      github: "https://github.com/Maddy23032/Recipes-securin-day1-",
      demo: null,
    },
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6">
            <span className="text-stellar glow-teal">My Projects</span>
          </h2>
          <p className="text-center text-muted-foreground text-xl mb-12 max-w-2xl mx-auto">
            A collection of projects showcasing my technical skills
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.8, type: "spring" }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{
                  rotateY: 8,
                  rotateX: 8,
                  z: 50,
                  transition: { duration: 0.3 }
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                className="group bg-card/40 backdrop-blur-md rounded-2xl border-2 border-border overflow-hidden card-glow transition-all duration-500 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6 relative" style={{ transform: 'translateZ(20px)' }}>
                  <h3 className="text-2xl font-bold mb-3 text-stellar glow-teal group-hover:glow-purple transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full border border-primary/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-background neon-border transition-all duration-300 group/btn"
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      <Github className="mr-2 h-4 w-4 group-hover/btn:animate-pulse-glow" />
                      Access Code
                    </Button>
                    {project.demo && (
                      <Button
                        size="sm"
                        className="shimmer text-background font-bold group/btn relative overflow-hidden"
                        onClick={() => window.open(project.demo, '_blank')}
                      >
                        <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:animate-pulse-glow" />
                        Launch Demo
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
