import { CameraControls, useKeyboardControls } from "@react-three/drei";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import useStateEngine from "../useStateEngine";
import { Player } from "./Player";
import { Player02 } from "./Player02";
import { useFrame } from "@react-three/fiber";
import { Player03 } from "./Player03";
import { Euler, Quaternion, Vector3 } from "three";
import { useControls } from "leva";

export function PlayerController2() {
  console.log("hi");
  const props = useControls("camera", {
    x: {
      value: 0,
      min: -10,
      max: 10,
      step: 1,
    },
    y: {
      value: 0,
      min: -10,
      max: 10,
      step: 1,
    },
    z: {
      value: 0,
      min: -10,
      max: 10,
      step: 1,
    },
    tx: {
      value: 0,
      min: -10,
      max: 10,
      step: 1,
    },
    ty: {
      value: 0,
      min: -10,
      max: 10,
      step: 1,
    },
    tz: {
      value: 0,
      min: -10,
      max: 10,
      step: 1,
    },
  });
  const JUMP_FORCE = 0.5;
  const MOVEMENT_SPEED = 4;
  const MAX_VEL = 3;
  let changeRotation = false;

  const playerBody = useRef();
  const cameraRef = useRef();
  const currAnimation = useRef();

  const [subscribeKeys, getKeys] = useKeyboardControls();

  const setAnimationState = useStateEngine((state) => state.setState);
  // const setLinVel = useStateEngine((state) => state.setLinVel);
  // const setImpulse = useStateEngine((state) => state.setImpulse);
  useEffect(() => {
    const unsubsribeAnimation = useStateEngine.subscribe(
      (state) => state.currentState,
      (value) => {
        currAnimation.current = value;
        // console.log("cur:", value);
        // actions[prevAnimation.current].fadeOut(0.5);
        // actions[value].reset().fadeIn(0.5).play();
      },
    );
    const unsubcribeJump = subscribeKeys(
      (state) => state.jump,
      (pressed) => {
        if (pressed) {
          // console.log();
          setAnimationState("TPose");
        }
        if (!pressed) {
          // console.log("jump", pressed);
          setAnimationState("Idle");
        }
      },
    );
    const unsubcribeForward = subscribeKeys(
      (state) => state.forward,
      (pressed) => {
        if (pressed) {
          setAnimationState("Walk");
        }

        if (
          !pressed &&
          !(getKeys().back || getKeys().left || getKeys().right)
        ) {
          setAnimationState("Idle");
        }
      },
    );
    const unsubcribeBack = subscribeKeys(
      (state) => state.back,
      (pressed) => {
        if (pressed) {
          setAnimationState("Walk");
        }
        if (
          !pressed &&
          !(getKeys().forward || getKeys().left || getKeys().right)
        ) {
          setAnimationState("Idle");
        }
      },
    );
    const unsubcribeLeft = subscribeKeys(
      (state) => state.left,
      (pressed) => {
        if (pressed) {
          // playerBody.current.applyTorqueImpulse({ x: 0, y: 0.1, z: 0 }, true);
          setAnimationState("Walk");
        }
        if (
          !pressed &&
          !(getKeys().back || getKeys().forward || getKeys().right)
        ) {
          setAnimationState("Idle");
        }
      },
    );
    const unsubcribeRight = subscribeKeys(
      (state) => state.right,
      (pressed) => {
        if (pressed) {
          // playerBody.current.applyTorqueImpulse({ x: 0, y: -0.1, z: 0 }, true);
          setAnimationState("Walk");
        }
        if (
          !pressed &&
          !(getKeys().back || getKeys().left || getKeys().forward)
        ) {
          setAnimationState("Idle");
        }
      },
    );
    const unsubcribeShift = subscribeKeys(
      (state) => state.run,
      (pressed) => {
        if (pressed && currAnimation.current === "Walk") {
          setAnimationState("Run");
          return;
        }
        if (!pressed && currAnimation.current === "Run") {
          setAnimationState("Walk");
          return;
        }
        if (!pressed) {
          setAnimationState("Idle");
        }
      },
    );
    return () => {
      unsubcribeJump();
      unsubcribeForward();
      unsubcribeBack();
      unsubcribeLeft();
      unsubcribeRight();
      unsubcribeShift();
      unsubsribeAnimation();
    };
  }, []);

  useFrame((state, delta) => {
    const impulse = { x: 0, y: 0, z: 0 };
    const linVel = playerBody.current.linvel();
    const playerPosition = playerBody.current.translation();
    let changeRotation = false;
    // console.log(playerPosition);

    // if (jumpPressed && isOnFloor.current) {
    //   impulse.y += JUMP_FORCE;
    //   changeRotation = true;
    //   isOnFloor.current = false;
    // }
    if (getKeys().forward && linVel.z > -MAX_VEL) {
      impulse.z -= MOVEMENT_SPEED * delta * 10;
      changeRotation = true;
    }
    if (getKeys().forward && getKeys().run && linVel.z > -MAX_VEL * 3) {
      impulse.z -= MOVEMENT_SPEED * delta * 10;
      changeRotation = true;
    }
    if (getKeys().back && linVel.z < MAX_VEL) {
      impulse.z += MOVEMENT_SPEED * delta * 10;
      changeRotation = true;
    }
    if (getKeys().left && linVel.x > -MAX_VEL) {
      impulse.x -= MOVEMENT_SPEED * delta * 10;
      changeRotation = true;
    }
    if (getKeys().right && linVel.x < MAX_VEL) {
      impulse.x += MOVEMENT_SPEED * delta * 10;
      changeRotation = true;
    }

    // console.log(impulse);

    playerBody.current.applyImpulse(impulse, true);
    if (changeRotation) {
      // console.log(changeRotation);
      const angle = Math.atan2(linVel.x, linVel.z);
      const rotation = new Quaternion();
      rotation.setFromEuler(new Euler(0, angle, 0));
      // console.log(rotation);
      /*
       *add qurtanions for rotation
       */
      // const eular
      ///      playerBody.current.setRotation({ w: 1.0, x: 0.0, y: 1, z: 0.0 });
      // }
      // if (!changeRotation) {
      // console.log(changeRotation);
      // const angle = Math.atan2(linVel.x, linVel.z);
      playerBody.current.setRotation(rotation);
    }
    cameraRef.current.setLookAt(
      playerPosition.x + 0,
      playerPosition.y + 2,
      playerPosition.z - 4,
      playerPosition.x - 1,
      playerPosition.y + 1,
      playerPosition.z + -1,
      true,
    );
  });
  return (
    <>
      <CameraControls ref={cameraRef} />
      <RigidBody
        ref={playerBody}
        colliders={false}
        restitution={0.2}
        friction={0.7}
        position={[0, 5, 0]}
        enabledRotations={[false, true, false]}
        linearDamping={0.5}
        angularDamping={0.5}
      >
        {/* <group><Player position={[0, -0.8, 0]} /></group> */}
        {/* <Player02 position={[0, -0.8, 0]} /> */}
        <Player03 position={[0, -0.8, 0]} />
        <CapsuleCollider args={[0.5, 0.4]} translation={[0, 5, 0]} />
      </RigidBody>
    </>
  );
}
