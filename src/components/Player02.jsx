import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Quaternion, Vector3 } from "three";
import useStateEngine from "../useStateEngine";

export function Player02(props) {
  console.log("hi");
  const { currentState, prevState } = useStateEngine((state) => ({
    currentState: state.currentState,
    prevState: state.prevState,
  }));
  const group = useRef();

  const prevAnimation = useRef("Idle");
  // const toggleRun = useRef(false);

  const { nodes, materials, animations } = useGLTF("./Soldier.glb");
  // console.log(animations);
  const { actions, mixer } = useAnimations(animations, group);
  // const [subscribeKeys, getKeys] = useKeyboardControls();
  useEffect(() => {
    actions[prevState].fadeOut(0.5);
    actions[currentState].reset().fadeIn(0.5).play();
  }, [currentState]);

  useFrame((state, delta) => {});

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
