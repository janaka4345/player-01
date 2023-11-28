import { Grid, OrbitControls } from "@react-three/drei";
import Lights from "./Lights";
import { Physics, RigidBody } from "@react-three/rapier";
import { SphereGeometry } from "three";

export default function World() {
  return (
    <>
      <OrbitControls makeDefault />
      <axesHelper args={[2]} />
      <color attach="background" args={["#ffffff"]} />
      <Physics debug>
        <Lights />
        <RigidBody type="fixed" colliders="hull">
          <mesh rotation={[-Math.PI * 0.5, 0, 0]}>
            <planeGeometry args={[10, 10]} />
            <meshBasicMaterial color={"green"} />
          </mesh>
        </RigidBody>
        <RigidBody colliders="ball" position={[0.5, 5, 0]}>
          <mesh>
            <sphereGeometry />
            <meshBasicMaterial color={"red"} />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}
