import { motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    let mouseTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      // Show navbar if mouse is in the top 80px of viewport
      if (e.clientY <= 80) {
        setIsNavVisible(true);
        // Clear any pending hide timeout
        clearTimeout(mouseTimeout);
      } else {
        // Hide navbar after a brief delay when mouse leaves the zone
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
          setIsNavVisible(false);
        }, 300); // 300ms delay before hiding
      }
    };

    // Add event listener
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(mouseTimeout);
    };
  }, []);

  const menuItems = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Internship", href: "#internship" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Achievements", href: "#achievements" },
    { label: "Skills", href: "#skills" },
    { label: "Hobbies", href: "#hobbies" },
    { label: "Contact", href: "#contact" },
  ];

  const handleDownload = () => {
    // Open Google Drive resume link in new tab
    window.open("https://drive.google.com/file/d/1ojl0mo8ustPQq3VTUcFivdioCuQsw0I5/view?usp=sharing", "_blank");
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isNavVisible ? 0 : -100, 
        opacity: isNavVisible ? 1 : 0 
      }}
      transition={{ 
        duration: 0.4, 
        ease: isNavVisible ? "easeOut" : "easeIn" 
      }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b-2 border-primary/30 shadow-lg shadow-primary/10"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold cursor-pointer"
          >
            <span className="text-stellar glow-teal">Portfolio</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ scale: 1.15, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-foreground/80 hover:text-primary hover:glow-teal transition-all duration-300 font-medium relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
            <Button
              onClick={handleDownload}
              className="group animated-border text-background font-bold relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Download className="h-4 w-4 group-hover:animate-pulse-glow" />
                Download Resume
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-primary p-2 hover:bg-primary/10 rounded-lg transition-colors neon-border"
          >
            {isOpen ? <X size={28} className="animate-pulse-glow" /> : <Menu size={28} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="md:hidden mt-4 pb-4 flex flex-col gap-4 bg-card/40 backdrop-blur-md p-4 rounded-xl border-2 border-primary/30"
          >
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsOpen(false)}
                className="text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300 py-3 px-4 rounded-lg font-medium"
              >
                {item.label}
              </motion.a>
            ))}
            <Button
              onClick={() => {
                handleDownload();
                setIsOpen(false);
              }}
              className="group animated-border text-background font-bold relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Download className="h-4 w-4 group-hover:animate-pulse-glow" />
                Download Resume
              </span>
            </Button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
