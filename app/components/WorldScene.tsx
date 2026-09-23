"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { SceneMode } from "./Scene";

interface SceneProps {
  mode: SceneMode;
  active: number;
  transmitting: boolean;
  smallScreen: boolean;
  reducedMotion: boolean;
  running: boolean;
}

const pointVertex = `
  uniform float uTime;
  uniform float uAssemble;
  uniform float uSize;
  uniform vec2 uPointer;
  attribute float aSeed;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    float ripple = sin(uTime * .24 + aSeed * 40.0) * .045;
    p *= 1.0 + ripple + (1.0 - uAssemble) * aSeed * 1.8;
    vec2 delta = uPointer - p.xy;
    float gravity = exp(-dot(delta, delta) * .75) * .12;
    p.xy += delta * gravity;
    p.y += sin(uTime * .16 + aSeed * 24.0) * .035;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (13.0 / -mv.z) * (.4 + aSeed * .8);
    vAlpha = .25 + aSeed * .55;
  }
`;

const pointFragment = `
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - .5);
    if (d > .5) discard;
    float alpha = (1.0 - smoothstep(.05, .5, d)) * vAlpha;
    gl_FragColor = vec4(.54, .91, .83, alpha);
  }
`;

function usePointer() {
  const pointer = useRef(new THREE.Vector2(0, 0));
  const { gl } = useThree();
  useEffect(() => {
    const move = (event: PointerEvent) => {
      const bounds = gl.domElement.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      pointer.current.set(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        (-(event.clientY - bounds.top) / bounds.height) * 2 + 1,
      );
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [gl]);
  return pointer;
}

function Particles({
  count,
  radius,
  reducedMotion,
  spread = false,
}: {
  count: number;
  radius: number;
  reducedMotion: boolean;
  spread?: boolean;
}) {
  const points = useRef<THREE.Points>(null);
  const pointer = usePointer();
  const { viewport } = useThree();
  const gravityTarget = useMemo(() => new THREE.Vector3(), []);
  const data = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const seed = ((i * 16807 + 31) % 2147483647) / 2147483647;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r =
        radius *
        (spread
          ? 0.55 + ((i * 17) % 103) / 90
          : 0.94 + Math.sin(i * 7.71) * 0.055);
      positions[i * 3] = Math.cos(theta) * Math.sin(phi) * r;
      positions[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * r;
      positions[i * 3 + 2] = Math.cos(phi) * r;
      seeds[i] = (seed * 500 + i * 0.618) % 1;
    }
    return { positions, seeds };
  }, [count, radius, spread]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAssemble: { value: reducedMotion ? 1 : 0 },
      uSize: { value: spread ? 1.5 : 1.1 },
      uPointer: { value: new THREE.Vector2(20, 20) },
    }),
    [reducedMotion, spread],
  );
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    elapsed.current += Math.min(delta, 0.05);
    uniforms.uTime.value = elapsed.current;
    uniforms.uAssemble.value = THREE.MathUtils.smoothstep(
      elapsed.current,
      0,
      2.5,
    );
    if (points.current) {
      gravityTarget.set(
        (pointer.current.x * viewport.width) / 2,
        (pointer.current.y * viewport.height) / 2,
        0,
      );
      points.current.worldToLocal(gravityTarget);
      uniforms.uPointer.value.x = THREE.MathUtils.damp(
        uniforms.uPointer.value.x,
        gravityTarget.x,
        2,
        delta,
      );
      uniforms.uPointer.value.y = THREE.MathUtils.damp(
        uniforms.uPointer.value.y,
        gravityTarget.y,
        2,
        delta,
      );
      points.current.rotation.y += Math.min(delta, 0.05) * 0.018;
    }
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[data.positions, 3]}
        />
        <bufferAttribute attach="attributes-aSeed" args={[data.seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={pointVertex}
        fragmentShader={pointFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Fragments({
  reducedMotion,
  count,
}: {
  reducedMotion: boolean;
  count: number;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const elapsed = useRef(0);

  const update = (time: number) => {
    if (!mesh.current) return;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const radius = 2.07 + Math.sin(i * 3.1 + time * 0.14) * 0.2;
      dummy.position.set(
        Math.cos(theta) * Math.sin(phi) * radius,
        Math.sin(theta) * Math.sin(phi) * radius,
        Math.cos(phi) * radius,
      );
      dummy.lookAt(0, 0, 0);
      dummy.rotateZ(i * 7.4 + time * 0.018);
      const size = 0.025 + (i % 7) * 0.007;
      dummy.scale.set(size, size * 1.8, 0.005);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  };

  useEffect(() => {
    update(0);
  }, [count]);
  useFrame((_, delta) => {
    if (reducedMotion) return;
    elapsed.current += Math.min(delta, 0.05);
    update(elapsed.current);
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#9bdecd" transparent opacity={0.4} />
    </instancedMesh>
  );
}

function Core({
  smallScreen,
  reducedMotion,
}: Pick<SceneProps, "smallScreen" | "reducedMotion">) {
  const root = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);
  const pointer = usePointer();
  const { viewport, camera } = useThree();
  const scale = smallScreen ? 0.79 : viewport.height / 8.4;

  useFrame((_, delta) => {
    if (reducedMotion || !root.current) return;
    root.current.rotation.y = THREE.MathUtils.damp(
      root.current.rotation.y,
      pointer.current.x * 0.12,
      2,
      delta,
    );
    root.current.rotation.x = THREE.MathUtils.damp(
      root.current.rotation.x,
      -pointer.current.y * 0.07,
      2,
      delta,
    );
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      10 - scroll * 0.65,
      3,
      delta,
    );
    root.current.rotation.z += delta * 0.009;
    if (orbit.current) orbit.current.rotation.z -= delta * 0.024;
  });

  return (
    <group
      ref={root}
      position={[
        smallScreen ? 0 : viewport.width * 0.211,
        smallScreen ? -0.55 : 0.02,
        0,
      ]}
      scale={scale}
    >
      <Particles
        count={smallScreen ? 450 : 2100}
        radius={2.12}
        reducedMotion={reducedMotion}
      />
      <Particles
        count={smallScreen ? 85 : 290}
        radius={2.6}
        reducedMotion={reducedMotion}
        spread
      />
      <Fragments reducedMotion={reducedMotion} count={smallScreen ? 24 : 70} />
      <group ref={orbit} rotation={[0.75, -0.35, -0.4]}>
        <mesh>
          <torusGeometry args={[2.73, 0.003, 3, 160]} />
          <meshBasicMaterial color="#8bcbb9" transparent opacity={0.2} />
        </mesh>
        <mesh rotation={[0.8, 0.4, -0.2]}>
          <torusGeometry args={[2.48, 0.003, 3, 128]} />
          <meshBasicMaterial color="#9ba0cd" transparent opacity={0.15} />
        </mesh>
      </group>
      <mesh rotation={[0.2, 0.3, 0.6]}>
        <icosahedronGeometry args={[1.96, 1]} />
        <meshBasicMaterial
          color="#9adbcf"
          wireframe
          transparent
          opacity={0.055}
        />
      </mesh>
    </group>
  );
}

function Pipeline({
  active,
  reducedMotion,
}: Pick<SceneProps, "active" | "reducedMotion">) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const elapsed = useRef(0);
  useFrame((_, delta) => {
    if (reducedMotion || !group.current) return;
    elapsed.current += Math.min(delta, 0.05);
    group.current.children.forEach((child, i) => {
      child.rotation.y += delta * (i === active ? 0.2 : 0.07);
      child.position.y = Math.sin(elapsed.current * 0.65 + i) * 0.08;
      const scale = i <= active ? 0.67 : 0.55;
      child.scale.setScalar(
        THREE.MathUtils.damp(child.scale.x, scale, 5, delta),
      );
    });
  });

  return (
    <group ref={group}>
      {Array.from({ length: 6 }, (_, i) => (
        <group
          key={i}
          position={[((i - 2.5) * viewport.width) / 6, 0, 0]}
          rotation={[0.35, 0.4, 0.15]}
          scale={0.6}
        >
          <mesh>
            {i === 0 ? (
              <icosahedronGeometry args={[0.7, 0]} />
            ) : i === 1 ? (
              <boxGeometry args={[0.85, 0.85, 0.85]} />
            ) : i === 2 ? (
              <octahedronGeometry args={[0.8, 0]} />
            ) : i === 3 ? (
              <torusGeometry args={[0.55, 0.13, 6, 24]} />
            ) : i === 4 ? (
              <icosahedronGeometry args={[0.7, 1]} />
            ) : (
              <coneGeometry args={[0.6, 1, 4]} />
            )}
            <meshBasicMaterial
              color={i <= active ? "#a5efdb" : "#50605d"}
              wireframe
              transparent
              opacity={i === active ? 0.95 : 0.5}
            />
          </mesh>
          <mesh scale={0.55}>
            <octahedronGeometry args={[0.5, 0]} />
            <meshBasicMaterial
              color={i === active ? "#a5efdb" : "#45605c"}
              transparent
              opacity={0.45}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Connection({
  reducedMotion,
  transmitting,
  smallScreen,
}: Pick<SceneProps, "reducedMotion" | "transmitting" | "smallScreen">) {
  const group = useRef<THREE.Group>(null);
  const packet = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);
  const transmissionTime = useRef(0);
  useEffect(() => {
    if (transmitting) transmissionTime.current = 0;
  }, [transmitting]);
  useFrame((_, delta) => {
    if (!group.current || reducedMotion) return;
    elapsed.current += Math.min(delta, 0.05);
    group.current.rotation.y += delta * (transmitting ? 0.8 : 0.07);
    group.current.position.y = Math.sin(elapsed.current * 0.4) * 0.1;
    if (transmitting && packet.current) {
      transmissionTime.current += Math.min(delta, 0.05);
      const progress = Math.min(transmissionTime.current / 1.3, 1);
      packet.current.position.set(
        3.4 * (1 - progress),
        Math.sin(progress * Math.PI) * 0.55,
        0.6 * Math.sin(progress * Math.PI),
      );
      packet.current.scale.setScalar(1 + Math.sin(progress * Math.PI) * 0.9);
    }
  });
  return (
    <group ref={group} rotation={[0.55, 0.25, -0.25]}>
      <Particles
        count={smallScreen ? 180 : 620}
        radius={2}
        reducedMotion={reducedMotion}
        spread
      />
      <mesh ref={packet} visible={transmitting} position={[3.4, 0, 0]}>
        <sphereGeometry args={[0.075, 12, 8]} />
        <meshBasicMaterial color="#d2fff2" />
      </mesh>
      <mesh>
        <torusGeometry args={[1.5, 0.006, 4, 120]} />
        <meshBasicMaterial color="#86cbbd" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, 0.35, 0]}>
        <torusGeometry args={[1.75, 0.005, 4, 120]} />
        <meshBasicMaterial color="#8e94c9" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[0.1, 0.4, 0.7]}>
        <octahedronGeometry args={[0.85, 0]} />
        <meshBasicMaterial
          color="#b7eedb"
          transparent
          opacity={0.6}
          wireframe
        />
      </mesh>
      <mesh scale={transmitting ? 0.6 : 0.3}>
        <octahedronGeometry args={[0.65, 0]} />
        <meshBasicMaterial color="#d2fff2" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

export default function WorldScene(props: SceneProps) {
  return (
    <Canvas
      dpr={props.smallScreen ? 1 : [1, 1.5]}
      camera={{
        position: [0, 0, props.mode === "pipeline" ? 5 : 10],
        fov: props.mode === "pipeline" ? 32 : 45,
      }}
      gl={{
        antialias: !props.smallScreen,
        alpha: true,
        powerPreference: "low-power",
      }}
      frameloop={!props.running || props.reducedMotion ? "demand" : "always"}
      fallback={
        <span className="sr-only">
          Decorative 3D scene. All portfolio content is available below.
        </span>
      }
    >
      {props.mode === "core" ? (
        <Core {...props} />
      ) : props.mode === "pipeline" ? (
        <Pipeline {...props} />
      ) : (
        <Connection {...props} />
      )}
    </Canvas>
  );
}
