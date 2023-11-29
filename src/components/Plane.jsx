import { useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { RepeatWrapping } from "three";

export default function Plane() {
  const texture = useTexture("./green.jpg");
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(10, 10);
  return (
    <RigidBody type="fixed" colliders="hull" restitution={0.2} friction={0.7}>
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100, 10, 10]} />
        <meshStandardMaterial map={texture} receiveShadow />
      </mesh>
    </RigidBody>
  );
}
