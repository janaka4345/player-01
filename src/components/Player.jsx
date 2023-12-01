import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Quaternion, Vector3 } from "three";
import useStateEngine from "../useStateEngine";

export function Player(props) {
  const group = useRef();

  const prevAnimation = useRef("Idle");
  // const toggleRun = useRef(false);

  const { nodes, materials, animations } = useGLTF("./Soldier.glb");
  // console.log(animations);
  const { actions, mixer } = useAnimations(animations, group);
  // const [subscribeKeys, getKeys] = useKeyboardControls();

  useEffect(() => {
    // console.log(actions);
    actions.Idle.reset().fadeIn(0.5).play();
    const unsubsribePrevAnimation = useStateEngine.subscribe(
      (state) => state.prevState,
      (value) => {
        // console.log("prev:", value);
        prevAnimation.current = value;
      },
    );
    const unsubsribeAnimation = useStateEngine.subscribe(
      (state) => state.currentState,
      (value) => {
        // console.log("cur:", value);
        actions[prevAnimation.current].fadeOut(0.5);
        actions[value].reset().fadeIn(0.5).play();
      },
    );
    return () => {
      unsubsribeAnimation();
      unsubsribePrevAnimation();
    };
  }, []);

  // useEffect(() => {
  //   actions.Idle.reset().fadeIn(0.5).play();
  //   const unsubcribeJump = subscribeKeys(
  //     (state) => state.jump,
  //     (pressed) => {
  //       if (pressed) {
  //         // console.log();
  //       }
  //       if (!pressed) {
  //         // console.log("jump", pressed);
  //       }
  //     },
  //   );
  //   const unsubcribeForward = subscribeKeys(
  //     (state) => state.forward,
  //     (pressed) => {
  //       if (pressed) {
  //         actions.Idle.fadeOut(0.5);
  //         // console.log("forward", pressed);
  //         actions.Walk.reset().fadeIn(0.5).play();
  //         currrentAnimation.current = "Walk";
  //       }

  //       if (!pressed) {
  //         // console.log("forward", pressed);
  //         actions.Run.fadeOut(0.5);
  //         actions.Walk.fadeOut(0.5);
  //         actions.Idle.reset().fadeIn(0.5).play();
  //         currrentAnimation.current = "Idle";
  //       }
  //     },
  //   );
  //   const unsubcribeBack = subscribeKeys(
  //     (state) => state.back,
  //     (pressed) => {
  //       if (pressed) {
  //         actions.Idle.fadeOut(0.5);
  //         actions.Walk.reset().fadeIn(0.5).play();
  //         currrentAnimation.current = "Walk";
  //       }
  //       if (!pressed) {
  //         actions.Walk.fadeOut(0.5);
  //         actions.Idle.reset().fadeIn(0.5).play();
  //         currrentAnimation.current = "Idle";
  //       }
  //     },
  //   );
  //   const unsubcribeLeft = subscribeKeys(
  //     (state) => state.left,
  //     (pressed) => {
  //       if (pressed) {
  //         // group.current.rotation.set([0, Math.Pi * 0.5, 0]);
  //         // actions.Idle.reset().fadeIn(0.5).play();
  //       }
  //     },
  //   );
  //   const unsubcribeRight = subscribeKeys(
  //     (state) => state.right,
  //     (pressed) => {
  //       if (pressed) {
  //         console.log(actions);
  //         // actions.Run.reset().fadeIn(0.5).play();
  //       }
  //     },
  //   );
  //   const unsubcribeShift = subscribeKeys(
  //     (state) => state.run,
  //     (pressed) => {
  //       if (pressed) {
  //         toggleRun.current = !toggleRun.current;
  //         // mixer.update(0.16);

  //         // actions.Idle.fadeOut(0.5);
  //         // actions.Run.reset().fadeIn(0.5).play();

  //         // actions?.Idle?.fadeOut(0.5);
  //         // actions?.Walk?.fadeOut(0.5);
  //         // console.log("forward", pressed);
  //         // actions.Run.reset().fadeIn(0.5).play();
  //       }
  //       if (!pressed) {
  //         // actions?.Run?.fadeOut(0.5);
  //         // actions.Idle.reset().fadeIn(0.5).play();
  //         // actions?.Walk?.fadeOut(0.5);
  //         // console.log(toggleRun, mixer);
  //         // actions.Run.reset().fadeIn(0.5).play();
  //       }
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

  // const walkDirection = new Vector3();
  // const rotateAngle = new Vector3(0, 1, 0);
  // const rotateQuortanion = new Quaternion();
  // const cameraTarget = new Vector3();

  // const runVel = 5;
  // const walkVel = 2;
  // useFrame((_, delta) => {
  //   let changeRotation = false;
  //   // console.log(group.current);
  // });

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        name="Scene"
        userData={{
          background_color: [
            0.05087608844041824, 0.05087608844041824, 0.05087608844041824,
          ],
          frames_per_second: 30,
        }}
      >
        <group
          name="Character"
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={0.01}
          userData={{ name: "Character" }}
        >
          <skinnedMesh
            castShadow
            name="vanguard_Mesh"
            geometry={nodes.vanguard_Mesh.geometry}
            material={materials.VanguardBodyMat}
            skeleton={nodes.vanguard_Mesh.skeleton}
            userData={{ name: "vanguard_Mesh" }}
          />
          <skinnedMesh
            name="vanguard_visor"
            geometry={nodes.vanguard_visor.geometry}
            material={materials.Vanguard_VisorMat}
            skeleton={nodes.vanguard_visor.skeleton}
            userData={{ name: "vanguard_visor" }}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/Soldier.glb");
