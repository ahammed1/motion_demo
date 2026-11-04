import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function FloatingObjects() {
  const sculpture = useRef();
  const ring = useRef();

  useFrame((state, delta) => {
    if (!sculpture.current) return;
    sculpture.current.rotation.y += delta * 0.13;
    sculpture.current.rotation.x = THREE.MathUtils.damp(
      sculpture.current.rotation.x,
      state.pointer.y * 0.18 + 0.12,
      3,
      delta,
    );
    sculpture.current.rotation.z = THREE.MathUtils.damp(
      sculpture.current.rotation.z,
      -state.pointer.x * 0.12,
      3,
      delta,
    );
    if (ring.current) ring.current.rotation.z -= delta * 0.06;
  });

  return (
    <group ref={sculpture} position={[0.42, 0.02, 0]}>
      <Float speed={1.15} rotationIntensity={0.14} floatIntensity={0.27}>
        <mesh scale={1.23}>
          <torusKnotGeometry args={[0.72, 0.2, 220, 32, 2, 5]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            resolution={256}
            thickness={0.8}
            roughness={0.18}
            chromaticAberration={0.035}
            anisotropy={0.2}
            color="#d5f7df"
            distortion={0.22}
            distortionScale={0.18}
            temporalDistortion={0.08}
          />
        </mesh>
        <mesh ref={ring} rotation={[0.74, 0.2, -0.5]} scale={1.65}>
          <torusGeometry args={[1.06, 0.012, 8, 160]} />
          <meshBasicMaterial color="#a6ffb7" transparent opacity={0.7} />
        </mesh>
        <mesh rotation={[0.74, 0.2, -0.5]} scale={1.86}>
          <torusGeometry args={[1.06, 0.003, 5, 160]} />
          <meshBasicMaterial color="#72f68a" transparent opacity={0.28} />
        </mesh>
        <mesh position={[-1.28, 0.82, 0.3]}>
          <icosahedronGeometry args={[0.13, 1]} />
          <meshStandardMaterial color="#d9ffe0" emissive="#43fa72" emissiveIntensity={2.2} roughness={0.2} />
        </mesh>
        <mesh position={[1.27, -0.76, 0.35]} scale={0.075}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshBasicMaterial color="#acffb8" />
        </mesh>
      </Float>
    </group>
  );
}
