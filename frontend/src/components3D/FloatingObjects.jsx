import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function FloatingObjects() {
  const sculpture = useRef();
  const halo = useRef();

  useFrame((state, delta) => {
    if (!sculpture.current) return;
    sculpture.current.rotation.y += delta * 0.1;
    sculpture.current.rotation.x = THREE.MathUtils.damp(
      sculpture.current.rotation.x,
      state.pointer.y * 0.12,
      3,
      delta,
    );
    if (halo.current) halo.current.rotation.z -= delta * 0.035;
  });

  return (
    <group ref={sculpture} position={[0.42, 0.02, 0]}>
      <Float speed={1} rotationIntensity={0.06} floatIntensity={0.2}>
        <mesh scale={1.12}>
          <icosahedronGeometry args={[0.82, 5]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            resolution={256}
            thickness={0.55}
            roughness={0.24}
            chromaticAberration={0.018}
            anisotropy={0.08}
            color="#d5f7df"
            distortion={0.06}
            distortionScale={0.08}
            temporalDistortion={0.025}
          />
        </mesh>
        <mesh ref={halo} rotation={[0.95, 0.25, -0.5]} scale={1.55}>
          <torusGeometry args={[1.02, 0.008, 8, 160]} />
          <meshBasicMaterial color="#a6ffb7" transparent opacity={0.42} />
        </mesh>
        <mesh position={[-1.18, 0.78, 0.28]}>
          <icosahedronGeometry args={[0.075, 1]} />
          <meshStandardMaterial color="#d9ffe0" emissive="#43fa72" emissiveIntensity={1.6} roughness={0.24} />
        </mesh>
        <mesh position={[1.16, -0.72, 0.32]} scale={0.045}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshBasicMaterial color="#acffb8" />
        </mesh>
      </Float>
    </group>
  );
}
