import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function CameraController() {
  const target = useRef(new THREE.Vector3());
  useFrame(({ camera, pointer }, delta) => {
    target.current.set(pointer.x * 0.14, pointer.y * 0.1, 5.3);
    camera.position.lerp(target.current, 1 - Math.exp(-delta * 1.4));
    camera.lookAt(0, 0, 0);
  });
  return null;
}
