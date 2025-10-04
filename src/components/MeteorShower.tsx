import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const StarField = () => {
  const ref = useRef<THREE.Points>(null);
  const particlesCount = 5000;

  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4dd0e1"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
};

const Meteors = () => {
  const groupRef = useRef<THREE.Group>(null);
  const meteorsRef = useRef<Array<{ mesh: THREE.Mesh; velocity: THREE.Vector3 }>>([]);

  useEffect(() => {
    if (!groupRef.current) return;

    const meteorCount = 15;
    const meteors: Array<{ mesh: THREE.Mesh; velocity: THREE.Vector3 }> = [];

    for (let i = 0; i < meteorCount; i++) {
      const geometry = new THREE.CylinderGeometry(0.05, 0.01, 3, 8);
      const material = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? "#4dd0e1" : i % 3 === 1 ? "#ba68c8" : "#f06292",
        transparent: true,
        opacity: 0.8,
      });
      const meteor = new THREE.Mesh(geometry, material);

      meteor.position.set(
        Math.random() * 50 - 25,
        Math.random() * 50 + 20,
        Math.random() * 50 - 25
      );

      const angle = Math.random() * Math.PI * 2;
      meteor.rotation.z = angle;

      const velocity = new THREE.Vector3(
        Math.cos(angle) * (0.2 + Math.random() * 0.3),
        -(0.3 + Math.random() * 0.4),
        Math.sin(angle) * (0.2 + Math.random() * 0.3)
      );

      meteors.push({ mesh: meteor, velocity });
      groupRef.current.add(meteor);
    }

    meteorsRef.current = meteors;
  }, []);

  useFrame(() => {
    meteorsRef.current.forEach(({ mesh, velocity }) => {
      mesh.position.add(velocity);

      if (mesh.position.y < -30 || Math.abs(mesh.position.x) > 50 || Math.abs(mesh.position.z) > 50) {
        mesh.position.set(
          Math.random() * 50 - 25,
          Math.random() * 20 + 20,
          Math.random() * 50 - 25
        );
      }

      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = 0.8 - (20 - mesh.position.y) / 50;
    });
  });

  return <group ref={groupRef} />;
};

const NebulaBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#1a1a2e") },
      uColorB: { value: new THREE.Color("#16213e") },
      uColorC: { value: new THREE.Color("#0f3460") },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform vec3 uColorC;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        float wave1 = sin(uv.x * 3.0 + uTime * 0.3) * 0.5 + 0.5;
        float wave2 = sin(uv.y * 2.0 - uTime * 0.2) * 0.5 + 0.5;
        
        vec3 color = mix(uColorA, uColorB, wave1);
        color = mix(color, uColorC, wave2 * 0.5);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    side: THREE.BackSide,
  });

  return (
    <mesh ref={meshRef} material={shaderMaterial}>
      <sphereGeometry args={[50, 64, 64]} />
    </mesh>
  );
};

export const MeteorShower = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <NebulaBackground />
        <StarField />
        <Meteors />
      </Canvas>
    </div>
  );
};
