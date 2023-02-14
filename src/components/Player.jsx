import React, { useState, useRef, useEffect, Suspense, useMemo } from "react";
import * as THREE from "three";
import { useGLTF, useKeyboardControls, useAnimations } from "@react-three/drei";
import { Debug, RigidBody, Physics } from "@react-three/rapier";
import { useThree, extend, useFrame, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";

// ------------------------------------------------
function Player({}) {
  const [hitSound] = useState(() => new Audio("./sounds/moto.mp3"));
  const honda = useGLTF("./bikes/guzzi.glb", true, {
    type: THREE.UnsignedByteType,
    format: THREE.RGBAFormat,
  });
  const bike = useRef(null);
  const [targetPosition, setTargetPosition] = useState(new Vector3(0, 0, 0));
  const [clickDetected, setClickDetected] = useState(false);
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [zPosition, setZPosition] = useState(0);

  // -----------------event function------------------
  const move = (e) => {
    e.stopPropagation();
    // -----------sound----------------
    hitSound.currentTime = 0;
    hitSound.volume = 0.3;
    hitSound.play();
    // -----------bike move----------------
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    const z = 0;
    setXPosition(x);
    setYPosition(y);
    setZPosition(z);
    setTargetPosition(new THREE.Vector3(x, y, z));
    setClickDetected(true);

    const mass = bike.current.mass();
    bike.current.addForce({ x: 2 * mass, y: 0, z: 0 });
  };

  // useFrame(() => {
  //   if (clickDetected) {
  //     setTargetPosition([xPosition, yPosition, zPosition]);
  //   }
  // });

  return (
    <>
      <RigidBody
        ref={bike}
        position={[1, 3, 0]}
        // position={targetPosition}

        // onCollisionEnter={collisionEnter}
      >
        <primitive
          object={honda.scene}
          scale={1}
          position={(0, -1, 0)}
          // position={targetPosition}
          castShadow
          onClick={move}
        />
      </RigidBody>
    </>
  );
}
useGLTF.preload("./bikes/guzzi.glb");

export default Player;
