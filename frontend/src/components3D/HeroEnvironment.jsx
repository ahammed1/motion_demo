import { Grid } from "@react-three/drei";

export default function HeroEnvironment() {
  return (
    <Grid
      position={[0, -1.72, 0]}
      args={[10, 10]}
      cellSize={0.5}
      cellThickness={0.35}
      cellColor="#173c23"
      sectionSize={2}
      sectionThickness={0.7}
      sectionColor="#43834d"
      fadeDistance={7}
      fadeStrength={1.5}
      infiniteGrid
    />
  );
}
