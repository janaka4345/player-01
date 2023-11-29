import {
  OrbitControls,
  useKeyboardControls,
  useTexture,
} from "@react-three/drei";
import Lights from "./Lights";
import { CapsuleCollider, Physics, RigidBody } from "@react-three/rapier";
import { RepeatWrapping, Vector3 } from "three";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PlayerController } from "./PlayerControl";
import Plane from "./Plane";

export default function World() {
  const playerRef = useRef();

  const [subscribeKeys, getKeys] = useKeyboardControls();

  useFrame((_, delta) => {
    /*
     *Player
     */
    const { forward, back, left, right } = getKeys();
    // console.log(forward, back, left, right, jump );
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 5 * delta;
    const torqueStrength = 5 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (back) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (left) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }
    if (right) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }
    // console.log(impulse);
    // playerRef.current.applyImpulse(impulse, true);
    // playerRef.current.applyTorqueImpulse(torque, true);
  });

  return (
    <>
      <OrbitControls makeDefault />
      <axesHelper args={[2]} />
      <color attach="background" args={["#ffffff"]} />
      <fog args={["#ffffff", 25, 50]} attach={"fog"} />
      <Physics debug>
        <Lights />
        <Plane />
        <PlayerController />

        {/* <Box args={[2, 2, 2]} material-color="red" castShadow /> */}
      </Physics>
    </>
  );
}
