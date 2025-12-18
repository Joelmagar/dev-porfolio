import { Float, OrbitControls, Sparkles, Stars } from "@react-three/drei";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import CanvasLoader from "../ui/CanvasLoader";
import { ParticleField } from "./ParticleField";
import { FloatingShapes } from "./FloatingShapes";

export default function Scene() {
  return (
    <div className="fixed h-full inset-0 z-0 ">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <Suspense fallback={<CanvasLoader />}>
          <ambientLight intensity={0.2} color="#1e298b" />
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.5}
            color="#06b6d4"
          />
          <pointLight
            position={[-10, -10, -5]}
            intensity={0.3}
            color="#8b5cf6"
          />

          <Stars
            radius={1}
            depth={50}
            count={20}
            factor={10}
            saturation={20}
            fade
            speed={1}
          />
          {/* <Sparkles color={"yellow"} count={10000} size={100} /> */}
          <ParticleField  />

          {/* <Float speed={2} rotationIntensity={4} floatIntensity={10}>
            <FloatingShapes />
          </Float> */}

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 2.8}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

const RotatingCube = () => {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#468580" emissive="#468585" />
      </mesh>

      <Sparkles
        count={1000}
        scale={1}
        size={6}
        speed={0.002}
        noise={0.2}
        color={"orange"}
      />
    </>
  );
};
