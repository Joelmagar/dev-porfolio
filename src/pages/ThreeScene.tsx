import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Text3D, Center } from '@react-three/drei'
import { Suspense } from 'react'

function FloatingGeometry() {
  return (
    <Float
      speed={1.5}
      rotationIntensity={1}
      floatIntensity={2}
    >
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial 
          color="blue" 
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function Scene3D() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={50} shadow={310} />
      <pointLight position={[10, 0, 10]} intensity={1} />
      <spotLight
        position={[0, 15, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />

      {/* 3D Objects */}
      <FloatingGeometry />
      
      {/* Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={2}
      />
    </>
  )
}

export function ThreeScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </Canvas>
    </div>
  )
}