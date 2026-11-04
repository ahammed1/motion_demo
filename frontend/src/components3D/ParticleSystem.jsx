import { Sparkles } from "@react-three/drei";
import useResponsive from "../hooks/useResponsive.js";

export default function ParticleSystem() {
  const mobile = useResponsive("(max-width: 640px)");
  return <Sparkles count={mobile ? 38 : 85} scale={[7.6, 5.5, 3.2]} size={1.5} speed={0.16} opacity={0.42} color="#a7ffb8" />;
}
