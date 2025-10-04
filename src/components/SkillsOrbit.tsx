import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Html, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface SkillOrb {
  name: string;
  logo: string;
  color: string;
  geometry: 'box' | 'sphere' | 'icosahedron';
  orbitRadius: number;
  orbitSpeed: number;
  orbitInclination: number;
  level: 'Expert' | 'Intermediate' | 'Beginner';
  xp: number; // 0-100 percentage
}

const skills: SkillOrb[] = [
  { name: "Python", logo: "/python-svgrepo-com.svg", color: "#3776ab", geometry: "icosahedron", orbitRadius: 5, orbitSpeed: 0.3, orbitInclination: 10, level: "Expert", xp: 95 },
  { name: "Java", logo: "/java-svgrepo-com.svg", color: "#f89820", geometry: "box", orbitRadius: 6.5, orbitSpeed: 0.25, orbitInclination: -15, level: "Intermediate", xp: 70 },
  { name: "React", logo: "/react-1-logo-svgrepo-com.svg", color: "#61dafb", geometry: "sphere", orbitRadius: 8, orbitSpeed: 0.4, orbitInclination: 20, level: "Intermediate", xp: 90 },
  { name: "Vite", logo: "/Vite.js.svg", color: "#646cff", geometry: "icosahedron", orbitRadius: 5.8, orbitSpeed: 0.35, orbitInclination: -25, level: "Intermediate", xp: 75 },
  { name: "TypeScript", logo: "/typescript-svgrepo-com.svg", color: "#3178c6", geometry: "box", orbitRadius: 7.2, orbitSpeed: 0.28, orbitInclination: 30, level: "Intermediate", xp: 88 },
  { name: "Pandas", logo: "/pandas-svgrepo-com.svg", color: "#150458", geometry: "sphere", orbitRadius: 9.2, orbitSpeed: 0.22, orbitInclination: -12, level: "Intermediate", xp: 92 },
  { name: "NumPy", logo: "/numpy-svgrepo-com.svg", color: "#4dabcf", geometry: "icosahedron", orbitRadius: 8.7, orbitSpeed: 0.32, orbitInclination: 18, level: "Intermediate", xp: 90 },
  { name: "PyTorch", logo: "/pytorch-svgrepo-com.svg", color: "#ee4c2c", geometry: "box", orbitRadius: 10.5, orbitSpeed: 0.2, orbitInclination: -22, level: "Intermediate", xp: 78 },
  { name: "Scikit-learn", logo: "/scikitlearn-svgrepo-com.svg", color: "#f89939", geometry: "sphere", orbitRadius: 7.5, orbitSpeed: 0.38, orbitInclination: 8, level: "Intermediate", xp: 85 },
  { name: "Machine Learning", logo: "/machine-learning-svgrepo-com.svg", color: "#ba68c8", geometry: "icosahedron", orbitRadius: 9.8, orbitSpeed: 0.26, orbitInclination: -28, level: "Intermediate", xp: 87 },
  { name: "NLP", logo: "/natural-language-understanding-svgrepo-com.svg", color: "#9c27b0", geometry: "box", orbitRadius: 8.3, orbitSpeed: 0.33, orbitInclination: 15, level: "Intermediate", xp: 72 },
  { name: "Flask", logo: "/flask-svgrepo-com.svg", color: "#ffffff", geometry: "sphere", orbitRadius: 6.2, orbitSpeed: 0.42, orbitInclination: -18, level: "Intermediate", xp: 80 },
  { name: "FastAPI", logo: "/fastapi-svgrepo-com.svg", color: "#009688", geometry: "icosahedron", orbitRadius: 6.8, orbitSpeed: 0.36, orbitInclination: 25, level: "Intermediate", xp: 75 },
  { name: "Git", logo: "/git-svgrepo-com.svg", color: "#f05032", geometry: "box", orbitRadius: 10.2, orbitSpeed: 0.24, orbitInclination: -8, level: "Expert", xp: 93 },
  { name: "MongoDB", logo: "/mongodb-svgrepo-com.svg", color: "#47a248", geometry: "sphere", orbitRadius: 9.0, orbitSpeed: 0.29, orbitInclination: 22, level: "Intermediate", xp: 82 },
  { name: "Touch-typing", logo: "/typing-svgrepo-com.svg", color: "#4dd0e1", geometry: "icosahedron", orbitRadius: 11.0, orbitSpeed: 0.18, orbitInclination: -32, level: "Expert", xp: 98 },
];

// Helper function to ensure text has good contrast
function getTextColor(hexColor: string): string {
  // Convert hex to RGB
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // If color is too dark (luminance < 0.4), lighten it
  if (luminance < 0.4) {
    // Lighten the color by mixing with white
    const lightenFactor = 0.6;
    const newR = Math.round(r + (255 - r) * lightenFactor);
    const newG = Math.round(g + (255 - g) * lightenFactor);
    const newB = Math.round(b + (255 - b) * lightenFactor);
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  }
  
  return hexColor;
}

// Individual Skill Orb Component with Fluid Dynamic Animations
function SkillOrb({ skill, index, onHover }: { skill: SkillOrb; index: number; onHover: (name: string | null) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [orbitAngle, setOrbitAngle] = useState((index / skills.length) * Math.PI * 2);
  
  // Smooth animation states
  const [currentSpeed, setCurrentSpeed] = useState(skill.orbitSpeed);
  const [zoomOffset, setZoomOffset] = useState(0);
  const [cardPosition, setCardPosition] = useState<[number, number, number]>([0, -3, 0]);
  
  // Load texture
  const texture = useLoader(THREE.TextureLoader, skill.logo);
  
  // Configure texture settings for better appearance
  useMemo(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;
    }
  }, [texture]);

  // Fluid animation loop
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth deceleration/acceleration for orbit speed
    const targetSpeed = hovered ? 0 : skill.orbitSpeed;
    const speedTransition = hovered ? 0.1 : 0.08; // Faster deceleration, slightly slower acceleration
    setCurrentSpeed(prev => prev + (targetSpeed - prev) * speedTransition);

    // Update orbit angle with current speed
    setOrbitAngle(prev => prev + currentSpeed * delta);

    // Smooth zoom forward/backward effect
    const targetZoom = hovered ? 1.5 : 0;
    const zoomTransition = hovered ? 0.15 : 0.1; // Quick zoom in, smooth zoom out
    setZoomOffset(prev => prev + (targetZoom - prev) * zoomTransition);

    // Calculate orbital position (flat on XZ plane)
    const baseX = Math.cos(orbitAngle) * skill.orbitRadius;
    const baseZ = Math.sin(orbitAngle) * skill.orbitRadius;
    const y = 0;

    // Apply zoom offset towards camera
    const directionToCamera = new THREE.Vector3();
    directionToCamera.subVectors(state.camera.position, new THREE.Vector3(baseX, y, baseZ)).normalize();
    
    const x = baseX + directionToCamera.x * zoomOffset;
    const z = baseZ + directionToCamera.z * zoomOffset;

    groupRef.current.position.set(x, y, z);

    // Make the plane always face the camera (billboard effect)
    groupRef.current.lookAt(state.camera.position);

    // Intelligent card positioning based on viewport position
    if (hovered) {
      const position = new THREE.Vector3(x, y, z);
      const screenPosition = position.project(state.camera);
      
      // Determine best position for card based on screen coordinates
      // screenPosition.x and screenPosition.y are in range [-1, 1]
      let offsetX = 0;
      let offsetY = -3; // default bottom
      
      // If skill is in bottom half of screen, show card on top
      if (screenPosition.y < -0.2) {
        offsetY = 3;
      }
      // If skill is in top half, show below
      else if (screenPosition.y > 0.2) {
        offsetY = -3;
      }
      
      // Adjust horizontal position if near edges
      if (screenPosition.x < -0.5) {
        offsetX = 2; // Push to right if on left edge
      } else if (screenPosition.x > 0.5) {
        offsetX = -2; // Push to left if on right edge
      }
      
      setCardPosition([offsetX, offsetY, 0]);
    }

    // Animate hover ring
    if (hovered && ringRef.current) {
      ringRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.15);
      ringRef.current.rotation.z += delta * 2;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => {
        setHovered(true);
        onHover(skill.name);
      }}
      onPointerLeave={() => {
        setHovered(false);
        onHover(null);
      }}
    >
      {/* Bright background circle for dark icons */}
      <mesh position={[0, 0, -0.01]}>
        <circleGeometry args={[0.65, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.9}
          metalness={0.7}
          roughness={0.2}
          emissive="#ffffff"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Soft white glow behind icon for visibility */}
      <mesh position={[0, 0, -0.02]}>
        <circleGeometry args={[0.75, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          metalness={0.5}
          roughness={0.3}
          emissive="#ffffff"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* 2D Billboard Plane with Icon - Enhanced bloom-like glow */}
      <mesh scale={hovered ? 1.3 : 1}>
        <planeGeometry args={[1.2, 1.2]} />
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive="#ffffff"
          emissiveIntensity={hovered ? 4.0 : 2.5}
          transparent={true}
          opacity={1}
          side={THREE.DoubleSide}
          toneMapped={false}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Outer glow halo for bloom effect */}
      <mesh scale={(hovered ? 1.3 : 1) * 1.15}>
        <planeGeometry args={[1.2, 1.2]} />
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive="#ffffff"
          emissiveIntensity={hovered ? 2.0 : 1.0}
          transparent={true}
          opacity={hovered ? 0.5 : 0.3}
          side={THREE.DoubleSide}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>

      {/* Constant subtle glow ring (always visible) */}
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[0.65, 0.68, 32]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Enhanced Glowing Ring on Hover */}
      {hovered && (
        <>
          {/* Animated outer glow ring */}
          <mesh ref={ringRef} rotation={[0, 0, 0]}>
            <ringGeometry args={[0.7, 0.76, 32]} />
            <meshBasicMaterial
              color={skill.color}
              transparent
              opacity={0.7}
            />
          </mesh>
          
          {/* Expanding pulse ring */}
          <mesh rotation={[0, 0, 0]}>
            <ringGeometry args={[0.8, 0.85, 32]} />
            <meshBasicMaterial
              color={skill.color}
              transparent
              opacity={0.5}
            />
          </mesh>

          {/* Particle burst effect */}
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const distance = 1.2;
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * distance,
                  Math.sin(angle) * distance,
                  0
                ]}
              >
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshBasicMaterial
                  color={skill.color}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            );
          })}
        </>
      )}

      {/* Gamified Stats Card on hover */}
      {hovered && (
        <Html
          center
          position={cardPosition}
          distanceFactor={7}
          occlude={false}
          zIndexRange={[100, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="pointer-events-none"
          >
            {/* Glassmorphism Card */}
            <div
              className="relative rounded-3xl p-14 backdrop-blur-xl border-[2px] shadow-2xl overflow-hidden"
              style={{
                width: '440px',
                background: `linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 100%)`,
                borderColor: skill.color,
                boxShadow: `0 0 50px ${skill.color}70, 0 0 100px ${skill.color}40, inset 0 0 50px ${skill.color}15`,
              }}
            >
              {/* Animated Background Glow */}
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  background: `radial-gradient(circle at top left, ${skill.color} 0%, transparent 65%)`,
                }}
              />
              
              {/* Decorative corner accent */}
              <div
                className="absolute top-0 right-0 w-40 h-40 opacity-10"
                style={{
                  background: `radial-gradient(circle at top right, ${skill.color} 0%, transparent 70%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Skill Name */}
                <motion.h3
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="text-5xl font-bold mb-5"
                  style={{
                    color: getTextColor(skill.color),
                    textShadow: `0 0 20px ${getTextColor(skill.color)}, 0 0 40px ${getTextColor(skill.color)}, 0 0 60px ${getTextColor(skill.color)}80`,
                  }}
                >
                  {skill.name}
                </motion.h3>

                {/* Level Badge */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="inline-block px-7 py-2.5 rounded-full text-3xl font-bold tracking-wide"
                  style={{
                    backgroundColor: `${skill.color}25`,
                    color: getTextColor(skill.color),
                    border: `2px solid ${getTextColor(skill.color)}60`,
                    boxShadow: `0 0 20px ${getTextColor(skill.color)}50, inset 0 0 15px ${skill.color}20`,
                  }}
                >
                  {skill.level}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Html>
      )}
    </group>
  );
}

// Central Sun Component with Enhanced Glow
function CentralSun() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1);
    }
  });

  return (
    <group>
      {/* Powerful Point Light at Center - The Sun as Light Source */}
      <pointLight 
        position={[0, 0, 0]} 
        intensity={10} 
        color="#ffd700" 
        distance={50}
        decay={1.5}
      />
      
      {/* Core sphere - Super bright */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          toneMapped={false}
        />
      </mesh>

      {/* Inner glow layer - Bright yellow */}
      <mesh>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshBasicMaterial
          color="#ffd700"
          transparent
          opacity={0.8}
          toneMapped={false}
        />
      </mesh>

      {/* Pulsing middle glow - Creates bloom effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial
          color="#ffeb3b"
          transparent
          opacity={0.5}
          toneMapped={false}
        />
      </mesh>

      {/* Outer soft glow - Bloom spread */}
      <mesh>
        <sphereGeometry args={[2.0, 32, 32]} />
        <meshBasicMaterial
          color="#fff59d"
          transparent
          opacity={0.25}
          toneMapped={false}
        />
      </mesh>

      {/* Far outer atmosphere - Final bloom layer */}
      <mesh>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#ffffe0"
          transparent
          opacity={0.1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// Orbital Rings Component
function OrbitalRings() {
  const uniqueRadii = useMemo(() => {
    const radii = new Set(skills.map(s => s.orbitRadius));
    return Array.from(radii);
  }, []);

  return (
    <>
      {uniqueRadii.map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.01, 16, 100]} />
          <meshStandardMaterial 
            color="#4dd0e1" 
            opacity={0.3} 
            transparent 
            metalness={0.9}
            roughness={0.1}
            emissive="#4dd0e1"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </>
  );
}

// Main 3D Scene Component
function SkillsScene() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Subtle scene rotation based on time
  useFrame((state) => {
    if (groupRef.current && !hoveredSkill) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
    }
  });

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 10, 28]} fov={45} near={0.1} far={1000} />
      
      {/* Controls */}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        dampingFactor={0.05}
        enableDamping
      />

      {/* Minimal Ambient Light - Most lighting comes from central sun */}
      <ambientLight intensity={0.1} color="#1a1a2e" />
      
      {/* Subtle accent lights for depth */}
      <pointLight position={[15, 10, 15]} intensity={0.3} color="#61dafb" distance={30} />
      <pointLight position={[-15, -10, -15]} intensity={0.3} color="#ba68c8" distance={30} />

      {/* Scene Group */}
      <group ref={groupRef}>
        {/* Central Sun (contains main point light) */}
        <CentralSun />

        {/* Orbital Rings */}
        <OrbitalRings />

        {/* Orbiting Skills */}
        {skills.map((skill, index) => (
          <SkillOrb
            key={skill.name}
            skill={skill}
            index={index}
            onHover={setHoveredSkill}
          />
        ))}
      </group>

      {/* Stars background */}
      <Stars />
    </>
  );
}

// Background Stars
function Stars() {
  const starsRef = useRef<THREE.Points>(null);

  const starPositions = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starPositions.length / 3}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
}

// Main Export Component
export const SkillsOrbit = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="py-32 relative min-h-screen overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section Title */}
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-center mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-stellar glow-purple">Technical Skills</span>
          </motion.h2>

          <motion.p
            className="text-center text-muted-foreground text-xl mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            My technology stack and areas of expertise
          </motion.p>

          {/* 3D Canvas */}
          <motion.div
            className="w-full h-[1100px] rounded-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <Canvas
              shadows
              gl={{ 
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
              }}
              style={{ background: 'transparent' }}
            >
              <SkillsScene />
            </Canvas>
          </motion.div>

          {/* Interaction Hint */}
          <motion.p
            className="text-center text-muted-foreground mt-8 text-sm"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            🌌 Drag to rotate • ✨ Hover over skills to pause orbit and reveal name
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
