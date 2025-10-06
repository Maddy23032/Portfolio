import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, Linkedin, Mail, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

      // Check if EmailJS is configured
      if (serviceId === "YOUR_SERVICE_ID" || templateId === "YOUR_TEMPLATE_ID" || publicKey === "YOUR_PUBLIC_KEY") {
        toast.error("EmailJS not configured yet. Please add your credentials to .env file.");
        setIsSubmitting(false);
        return;
      }

      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "Madhu Karthick", // Your name
        },
        publicKey
      );

      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Github, href: "mailto:karthickarrul2005@gmail.com", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/madhukarthicka/", label: "LinkedIn" },
    { icon: MessageSquare, href: "https://github.com/Maddy23032", label: "X (Twitter)" },
    { icon: Mail, href: "https://x.com/Maddyxacct", label: "Email" },
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6">
            <span className="text-stellar glow-fuchsia">Contact Me</span>
          </h2>
          <p className="text-center text-muted-foreground text-xl mb-12 max-w-2xl mx-auto">
            Get in touch for collaborations
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-card/40 backdrop-blur-md p-8 rounded-2xl border-2 border-border card-glow neon-border"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Reason for contact"
                    required
                    rows={5}
                    className="bg-background/50 border-border focus:border-primary resize-none"
                  />
                </div>
                <Button 
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="group w-full animated-border-pulse text-background font-bold text-lg relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Send className={`w-5 h-5 ${isSubmitting ? 'animate-pulse' : 'group-hover:animate-pulse-glow'}`} />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                  <div className="shimmer absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </form>
            </motion.div>

            {/* Social Links & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-card/40 backdrop-blur-md p-8 rounded-2xl border-2 border-border card-glow neon-border">
                <h3 className="text-2xl font-bold mb-4 text-stellar glow-purple">
                  Communication Array
                </h3>
                <p className="text-muted-foreground mb-8 text-lg">
                  Connect across multiple dimensions. All channels are open for collaboration.
                </p>

                <div className="flex justify-center gap-6 mb-8">
                  {[
                    { Icon: Mail, color: "text-primary", delay: 0 },
                    { Icon: Linkedin, color: "text-secondary", delay: 0.1 },
                    { Icon: Github, color: "text-accent", delay: 0.2 },
                    { Icon: MessageSquare, color: "text-primary", delay: 0.3 }
                  ].map(({ Icon, color, delay }, idx) => (
                    <motion.a
                      key={idx}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 1 + delay, type: "spring", stiffness: 200 }}
                      whileHover={{ 
                        scale: 1.3, 
                        rotate: 360,
                        transition: { duration: 0.5 }
                      }}
                      href={socialLinks[idx].href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group p-5 bg-card/50 rounded-full border-2 border-border hover:border-primary neon-border transition-all duration-300 ${color}`}
                    >
                      <Icon className="w-7 h-7 group-hover:animate-pulse-glow" />
                    </motion.a>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="bg-card/40 backdrop-blur-md p-8 rounded-2xl border-2 border-border card-glow neon-border text-center"
              >
                <h3 className="text-xl font-bold mb-2 text-primary glow-teal">
                  Response Time
                </h3>
                <p className="text-muted-foreground text-lg">
                  I'll respond within 24-48 hours
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
