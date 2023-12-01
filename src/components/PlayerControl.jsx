import { useKeyboardControls } from "@react-three/drei";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import useStateEngine from "../useStateEngine";
import { Player } from "./Player";
import { Player02 } from "./Player02";
import { useFrame } from "@react-three/fiber";

export function PlayerController() {
  console.log("hi");

  const JUMP_FORCE = 0.5;
  const MOVEMENT_SPEED = 0.1;
  const MAX_VEL = 3;
  let changeRotation = false;

  const playerBody = useRef();
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

        if (!pressed) {
          setAnimationState("Idle");
        }
      },
    );
    const unsubcribeBack = subscribeKeys(
      (state) => state.back,
      (pressed) => {
        if (pressed) {
        }
        if (!pressed) {
        }
      },
    );
    const unsubcribeLeft = subscribeKeys(
      (state) => state.left,
      (pressed) => {
        if (pressed) {
          // group.current.rotation.set([0, Math.Pi * 0.5, 0]);
          // actions.Idle.reset().fadeIn(0.5).play();
        }
      },
    );
    const unsubcribeRight = subscribeKeys(
      (state) => state.right,
      (pressed) => {
        if (pressed) {
        }
      },
    );
    const unsubcribeShift = subscribeKeys(
      (state) => state.run,
      (pressed) => {
        if (pressed && getKeys().forward) {
          setAnimationState("Run");
          return;
        }
        if (!pressed && getKeys().forward) {
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
    const linVel = playerBody.current.linvel();
    const impulse = { x: 0, y: 0, z: 0 };

    // if (jumpPressed && isOnFloor.current) {
    //   impulse.y += JUMP_FORCE;
    //   changeRotation = true;
    //   isOnFloor.current = false;
    // }
    if (currAnimation.current === "Walk" && linVel.z > -MAX_VEL) {
      impulse.z -= MOVEMENT_SPEED;
      // changeRotation = true;
    }
    // if (backPressed && linVel.z < MAX_VEL) {
    //   impulse.z += MOVEMENT_SPEED;
    //   // changeRotation = true;
    // }
    // if (leftPressed && linVel.x > -MAX_VEL) {
    //   impulse.x -= MOVEMENT_SPEED;
    //   // changeRotation = true;
    // }
    // if (rightPressed && linVel.x < MAX_VEL) {
    //   impulse.x += MOVEMENT_SPEED;
    //   // changeRotation = true;
    // }

    playerBody.current.applyImpulse(impulse, true);
    // if (changeRotation) {
    //   const angle = Math.atan2(linVel.x, linVel.z);
    //   characterRef.current.rotation.y = angle;
    // }
  });
  return (
    <RigidBody
      ref={playerBody}
      colliders={false}
      restitution={0.2}
      friction={0.7}
      position={[0, 5, 0]}
      enabledRotations={[false, false, false]}
    >
      <Player position={[0, -0.8, 0]} />
      {/* <Player02 position={[0, -0.8, 0]} /> */}
      <CapsuleCollider args={[0.5, 0.4]} translation={[0, 5, 0]} />
    </RigidBody>
  );
}
