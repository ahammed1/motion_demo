import { Canvas } from "@react-three/fiber";
import CameraController from "./CameraController.jsx";
import FloatingObjects from "./FloatingObjects.jsx";
import HeroEnvironment from "./HeroEnvironment.jsx";
import Lighting from "./Lighting.jsx";
import ParticleSystem from "./ParticleSystem.jsx";

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.3], fov: 38 }}
      dpr={[1, 1.25]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Lighting />
      <CameraController />
      <HeroEnvironment />
      <FloatingObjects />
      <ParticleSystem />
    </Canvas>
  );
}
