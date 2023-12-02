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
  const MOVEMENT_SPEED = 4;
  const MAX_VEL = 3;
  let changeRotation = false;

  const playerBody = useRef();
  const characterBody = useRef();
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
          setAnimationState("Walk");
        }
        if (!pressed) {
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
        if (!pressed) {
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
        if (!pressed) {
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
        if (!pressed && currAnimation.current === "Walk") {
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
    let changeRotation = false;

    // if (jumpPressed && isOnFloor.current) {
    //   impulse.y += JUMP_FORCE;
    //   changeRotation = true;
    //   isOnFloor.current = false;
    // }
    if (getKeys().forward && linVel.z > -MAX_VEL) {
      impulse.z -= MOVEMENT_SPEED * delta;
      changeRotation = true;
    }
    if (getKeys().forward && getKeys().run && linVel.z > -MAX_VEL * 3) {
      impulse.z -= MOVEMENT_SPEED * delta;
      changeRotation = true;
    }
    if (getKeys().back && linVel.z < MAX_VEL) {
      impulse.z += MOVEMENT_SPEED * delta;
      changeRotation = true;
    }
    if (getKeys().left && linVel.x > -MAX_VEL) {
      impulse.x -= MOVEMENT_SPEED * delta;
      changeRotation = true;
    }
    if (getKeys().right && linVel.x < MAX_VEL) {
      impulse.x += MOVEMENT_SPEED * delta;
      changeRotation = true;
    }

    // console.log(impulse);

    playerBody.current.applyImpulse(impulse, true);
    if (changeRotation) {
      console.log(changeRotation);
      const angle = Math.atan2(linVel.x, linVel.z);
      playerBody.current.applyTorqueImpulse(
        { x: 0, y: 0.01 * delta, z: 0 },
        true,
      );
    }
    // if (!changeRotation) {
    // console.log(changeRotation);
    // const angle = Math.atan2(linVel.x, linVel.z);
    // playerBody.current.resetTorqueImpulse();
    // }
  });
  return (
    <RigidBody
      ref={playerBody}
      colliders={false}
      restitution={0.2}
      friction={2}
      position={[0, 5, 0]}
      enabledRotations={[false, true, false]}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <group ref={characterBody}>
        <Player position={[0, -0.8, 0]} />
      </group>
      {/* <Player02 position={[0, -0.8, 0]} /> */}
      <CapsuleCollider args={[0.5, 0.4]} translation={[0, 5, 0]} />
    </RigidBody>
  );
}
