import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { Player } from "./Player";

export function PlayerController() {
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
