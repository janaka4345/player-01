import { useKeyboardControls } from "@react-three/drei";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useEffect } from "react";
import useStateEngine from "../useStateEngine";
import { Player } from "./Player";
import { Player02 } from "./Player02";

export function PlayerController() {
  console.log("hi");
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const setAnimationState = useStateEngine((state) => state.setState);
  useEffect(() => {
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
    };
  }, []);
  return (
    <RigidBody
      colliders={false}
      restitution={0.2}
      friction={0.7}
      position={[0, 5, 0]}
    >
      <Player position={[0, -0.8, 0]} />
      {/* <Player02 position={[0, -0.8, 0]} /> */}
      <CapsuleCollider args={[0.5, 0.4]} translation={[0, 5, 0]} />
    </RigidBody>
  );
}
