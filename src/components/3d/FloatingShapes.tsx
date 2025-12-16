import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export const FloatingShapes = () => {
  const torusRef = useRef<Mesh>(null);
  const sphereRef = useRef<Mesh>(null);
  const boxRef = useRef<Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.2;
      torusRef.current.rotation.y = time * 0.3;
      torusRef.current.position.y = Math.sin(time) * 0.5;
    }

    if (sphereRef.current) {
      sphereRef.current.rotation.x = time * 0.1;
      sphereRef.current.rotation.z = time * 0.2;
      sphereRef.current.position.y = Math.cos(time * 0.8) * 0.3;
    }

    if (boxRef.current) {
      boxRef.current.rotation.x = time * 0.15;
      boxRef.current.rotation.y = time * 0.25;
      boxRef.current.position.y = Math.sin(time * 1.2) * 0.4;
    }
  });

   return (
     <group>
       {/* Torus */}
       <mesh ref={torusRef} position={[-4, 0, -2]}>
         <torusGeometry args={[1, 0.3, 16, 100]} />
         <meshStandardMaterial
           color="#06b6d4"
           emissive="#06b6d4"
           emissiveIntensity={0.2}
           wireframe={true}
         />
       </mesh>

       {/* Sphere */}
       <mesh ref={sphereRef} position={[4, 0, -3]}>
         <sphereGeometry args={[0.8, 32, 32]} />
         <meshStandardMaterial
           color="#8b5cf6"
           emissive="#8b5cf6"
           emissiveIntensity={0.1}
           transparent
           opacity={0.7}
         />
       </mesh>

       {/* Box */}
       <mesh ref={boxRef} position={[0, 2, -4]}>
         <boxGeometry args={[1, 1, 1]} />
         <meshStandardMaterial
           color="#ec4899"
           emissive="#ec4899"
           emissiveIntensity={0.15}
           wireframe={true}
         />
       </mesh>

       {/* Additional smaller shapes */}
       <mesh position={[-2, -2, -1]} rotation={[0.5, 0.5, 0]}>
         <octahedronGeometry args={[0.5]} />
         <meshStandardMaterial
           color="#06b6d4"
           emissive="#06b6d4"
           emissiveIntensity={0.3}
         />
       </mesh>

       <mesh position={[3, -1, -2]} rotation={[1, 0, 0.5]}>
         <tetrahedronGeometry args={[0.6]} />
         <meshStandardMaterial
           color="#8b5cf6"
           emissive="#8b5cf6"
           emissiveIntensity={0.2}
           wireframe={true}
         />
       </mesh>
     </group>
   );
};
