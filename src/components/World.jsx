import {
  Box,
  OrbitControls,
  useKeyboardControls,
  useTexture,
} from "@react-three/drei";
import Lights from "./Lights";
import { CapsuleCollider, Physics, RigidBody } from "@react-three/rapier";
import { RepeatWrapping } from "three";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Player } from "./Player";

export default function World() {
  const playerRef = useRef();

  const texture = useTexture("./green.jpg");
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(10, 10);

  const [subscribeKeys, getKeys] = useKeyboardControls();

  // useEffect(() => {
  //   const unsubcribeJump = subscribeKeys(
  //     (state) => state.jump,
  //     (pressed) => {
  //       console.log("jump", pressed);
  //     },
  //   );
  //   const unsubcribeForward = subscribeKeys(
  //     (state) => state.forward,
  //     (pressed) => {
  //       console.log("forward", pressed);
  //     },
  //   );
  //   const unsubcribeBack = subscribeKeys(
  //     (state) => state.back,
  //     (pressed) => {
  //       console.log("back", pressed);
  //     },
  //   );
  //   const unsubcribeLeft = subscribeKeys(
  //     (state) => state.left,
  //     (pressed) => {
  //       console.log("left", pressed);
  //     },
  //   );
  //   const unsubcribeRight = subscribeKeys(
  //     (state) => state.right,
  //     (pressed) => {
  //       console.log("right", pressed);
  //     },
  //   );
  //   const unsubcribeShift = subscribeKeys(
  //     (state) => state.run,
  //     (pressed) => {
  //       console.log("shift", pressed);
  //     },
  //   );
  //   return () => {
  //     unsubcribeJump();
  //     unsubcribeForward();
  //     unsubcribeBack();
  //     unsubcribeLeft();
  //     unsubcribeRight();
  //     unsubcribeShift();
  //   };
  // }, []);

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
        <RigidBody
          type="fixed"
          colliders="hull"
          restitution={0.2}
          friction={0.7}
        >
          <mesh rotation={[-Math.PI * 0.5, 0, 0]} receiveShadow>
            <planeGeometry args={[100, 100, 10, 10]} />
            <meshStandardMaterial color={"green"} receiveShadow />
          </mesh>
        </RigidBody>
        {/* <RigidBody
          ref={playerRef}
          colliders="ball"
          position={[0, 5, 0]}
          restitution={0.5}
          friction={0.2}
        >
          <mesh>
            <sphereGeometry />
            <meshBasicMaterial color={"red"} />
          </mesh>
        </RigidBody> */}
        <RigidBody
          colliders={false}
          restitution={0.2}
          friction={0.7}
          position={[0, 5, 0]}
        >
          <Player position={[0, -0.8, 0]} />
          <CapsuleCollider args={[0.5, 0.4]} translation={[0, 5, 0]} />
        </RigidBody>
        {/* <Box args={[2, 2, 2]} material-color="red" castShadow /> */}
      </Physics>
    </>
  );
}
