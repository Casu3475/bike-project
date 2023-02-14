import "../init";
import {
  Canvas,
  useThree,
  extend,
  useFrame,
  useLoader,
} from "@react-three/fiber";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import {
  useHelper,
  OrbitControls,
  useGLTF,
  useAnimations,
  meshBounds,
  TransformControls,
  PivotControls,
  MeshReflectorMaterial,
  Html,
  Float,
  Stage,
  Lightformer,
  Environment,
  Sky,
  ContactShadows,
  RandomizedLight,
  AccumulativeShadows,
  SoftShadows,
  BakeShadows,
  Text3D,
  Sparkles,
  shaderMaterial,
} from "@react-three/drei";
// import { useControls } from "leva";
// import { EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import {
  Debug,
  RigidBody,
  Physics,
  ConvexHullCollider,
  CuboidCollider,
} from "@react-three/rapier";
import { Vector3 } from "three";
import Player from "./Player.jsx";
// import Ground from "./Ground.jsx";

// ----------------------------------main function-------------------------------------------
function Portfolio() {
  const three = useThree();
  const cubeRef = useRef(); //for the current frame rate : state & delta
  const cube = useRef();
  // const groupRef = useRef();
  const { camera, gl } = three;

  // -------------------------------------------------------------------
  // useFrame((state, delta) => {
  // const angle = state.clock.elapsedTime;
  // state.camera.position.x = Math.sin(angle) * 8;
  // state.camera.position.z = Math.cos(angle) * 8;
  // state.camera.lookAt(0, 0, 0);
  //   cubeRef.current.rotation.y += delta;
  // groupRef.current.rotation.y += delta
  // });

  // ----------------collision noise-----------------
  // const collisionEnter = () => {
  // };

  // -------------------return meshs & components------------------------
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <Physics gravity={[0, -9.08, 0]}>
        <Debug />
        {/* -------------------------------cube--------------------------------  */}
        <RigidBody>
          <mesh ref={cubeRef} position-x={6} scale={1}>
            <boxGeometry />
            <meshStandardMaterial color="blue" wireframe={false} />
          </mesh>
        </RigidBody>

        {/* -----------------------------ground-------------------------------- */}
        <RigidBody type="fixed">
          <mesh position-y={-1.1} rotation-x={-Math.PI * 0.5} scale={100}>
            <planeGeometry />
            <MeshReflectorMaterial
              resolution={512}
              blur={[1000, 1000]}
              mixBlur={1}
              mirror={0.5}
              color="greenyellow"
            />
          </mesh>
        </RigidBody>

        {/* ---------------------create walls to prevent the objects to fall out of the scene--------------------------- */}
        <RigidBody type="fixed">
          <CuboidCollider args={[50, 20, 0.5]} position={[0, 10, 52.5]} />
          <CuboidCollider args={[50, 20, 0.5]} position={[0, 10, -52.5]} />
          <CuboidCollider args={[0.5, 20, 50]} position={[52.5, 10, 0]} />
          <CuboidCollider args={[0.5, 20, 50]} position={[-52.5, 10, 0]} />
        </RigidBody>

        {/* -----------------------------bike-------------------------------- */}
        <Player />

        {/* <Ground /> */}
      </Physics>

      {/* <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}> */}
      {/* <RigidBody colliders="hull"> */}
      {/* </Suspense> */}
    </>
  );
}

export default Portfolio;
