import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Player(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("./Soldier.glb");
  // console.log(animations);
  const { actions } = useAnimations(animations, group);
  const [subscribeKeys, getKeys] = useKeyboardControls();

  useEffect(() => {
    actions.Idle.reset().fadeIn(0.5).play();
    const unsubcribeJump = subscribeKeys(
      (state) => state.jump,
      (pressed) => {
        if (pressed) {
          // console.log();
        }
        if (!pressed) {
          // console.log("jump", pressed);
        }
      },
    );
    const unsubcribeForward = subscribeKeys(
      (state) => state.forward,
      (pressed) => {
        if (pressed) {
          actions.Idle.fadeOut(0.5);
          // console.log("forward", pressed);
          actions.Walk.reset().fadeIn(0.5).play();
        }

        if (!pressed) {
          // console.log("forward", pressed);
          actions.Run.fadeOut(0.5);
          actions.Walk.fadeOut(0.5);
          actions.Idle.reset().fadeIn(0.5).play();
        }
      },
    );
    const unsubcribeBack = subscribeKeys(
      (state) => state.back,
      (pressed) => {
        if (pressed) {
          actions.Idle.fadeOut(0.5);
          console.log("back", pressed);
          actions.Walk.reset().fadeIn(0.5).play();
        }
        if (!pressed) {
          actions.Walk.fadeOut(0.5);
          actions.Idle.reset().fadeIn(0.5).play();
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
          console.log("right", pressed);
          // actions.Run.reset().fadeIn(0.5).play();
        }
      },
    );
    const unsubcribeShift = subscribeKeys(
      (state) => state.run,
      (pressed) => {
        if (pressed && getKeys().forward) {
          actions?.Idle?.fadeOut(0.5);
          actions?.Walk?.fadeOut(0.5);
          // console.log("forward", pressed);
          actions.Run.reset().fadeIn(0.5).play();
        }
        if (!pressed && getKeys().forward) {
          actions?.Run?.fadeOut(0.5);
          actions.Walk.reset().fadeIn(0.5).play();
          // actions?.Walk?.fadeOut(0.5);
          // // console.log("forward", pressed);
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
      // unsubcribeShift();
    };
  }, []);

  useFrame((_, delta) => {
    // console.log(group.current);
  });

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
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.01}
          userData={{ name: "Character" }}
        >
          <skinnedMesh
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
