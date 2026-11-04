export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[2.8, 2.2, 3.5]} intensity={13} color="#8dffab" distance={8} />
      <pointLight position={[-3, -1.5, 1]} intensity={9} color="#198c4a" distance={7} />
      <spotLight position={[0, 4, 4]} intensity={8} angle={0.55} penumbra={0.8} color="#effff1" />
    </>
  );
}
