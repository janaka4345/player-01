import { Grid, OrbitControls, useTexture } from "@react-three/drei";
import Lights from "./Lights";
import { Physics, RigidBody } from "@react-three/rapier";
import { RepeatWrapping, SphereGeometry } from "three";

export default function World() {
  const texture = useTexture("./green.jpg");
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(10, 10);
  return (
    <>
      <OrbitControls makeDefault />
      <axesHelper args={[2]} />
      <color attach="background" args={["#ffffff"]} />
      <Physics debug>
        <Lights />
        <RigidBody
          type="fixed"
          colliders="hull"
          restitution={0.2}
          friction={0.7}
        >
          <mesh rotation={[-Math.PI * 0.5, 0, 0]}>
            <planeGeometry args={[100, 100, 10, 10]} />
            <meshBasicMaterial map={texture} />
          </mesh>
        </RigidBody>
        <RigidBody
          colliders="ball"
          position={[15, 5, 0]}
          restitution={0.5}
          friction={0.2}
        >
          <mesh>
            <sphereGeometry />
            <meshBasicMaterial color={"red"} />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}
