import "./init";

import React from "react";
import ReactDOM from "react-dom/client";
import Portfolio from "./components/Portfolio";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Canvas
      // flat
      // flat remove the toneMapping that mimics the HDR to LDR effect
      // dpr={(1, 2)} //device pixel ratio, avoid performance issues
      shadows
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        // outputEncoding: THREE.LinearEncoding,
        outputEncoding: THREE.sRGBEncoding,
        //way of encoding and decoding colors so that we store color information in a more optimised way in the GPU
      }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [3, 2, 6] }}
    >
      <Portfolio />
    </Canvas>
  </React.StrictMode>
);
