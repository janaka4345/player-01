import { useKeyboardControls } from "@react-three/drei";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useEffect } from "react";
import useStateEngine from "../useStateEngine";
import { Player } from "./Player";

export function PlayerController() {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const setAnimationState = useStateEngine((state) => state.setState);
  const setToggle = useStateEngine((state) => state.setToggle);
  useEffect(() => {
    const unsubcribeJump = subscribeKeys(
      (state) => state.jump,
      (pressed) => {
        if (pressed) {
          // console.log();
          setAnimationState("TBody");
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
          // console.log("forward", pressed);
          setAnimationState("Walk");
        }

        if (!pressed) {
          // console.log("forward", pressed);
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
          // console.log(actions);
          // actions.Run.reset().fadeIn(0.5).play();
        }
      },
    );
    const unsubcribeShift = subscribeKeys(
      (state) => state.run,
      (pressed) => {
        if (pressed) {
          setToggle();
          // toggleRun.current = !toggleRun.current;
          // mixer.update(0.16);
          // actions.Idle.fadeOut(0.5);
          // actions.Run.reset().fadeIn(0.5).play();
          // actions?.Idle?.fadeOut(0.5);
          // actions?.Walk?.fadeOut(0.5);
          // console.log("forward", pressed);
          // actions.Run.reset().fadeIn(0.5).play();
        }
        if (!pressed) {
          // setToggle();
          // actions?.Run?.fadeOut(0.5);
          // actions.Idle.reset().fadeIn(0.5).play();
          // actions?.Walk?.fadeOut(0.5);
          // console.log(toggleRun, mixer);
          // actions.Run.reset().fadeIn(0.5).play();
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
      <CapsuleCollider args={[0.5, 0.4]} translation={[0, 5, 0]} />
    </RigidBody>
  );
}
