import { CameraControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function CameraController(params) {
  const cameraRef = useRef();
  useFrame((state, delta) => {});
  return <CameraControls ref={cameraRef} />;
}
