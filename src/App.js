import React, { useRef } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import InfiniteGridHelper from "./lib/InfiniteGridHelper";

import "./App.css";

import Snake from "./components/Snake";
import SnakeSequencer from "./components/SnakeSequencer";
// import Controls from "./components/Controls";

import * as Math from "mathjs";

extend({ OrbitControls });

// const ICO_START_OPACITY = 0;
// const RECT_START_OPACITY = 1;
// const START_SPIN_SPEED = 0.5;

// From https://codeworkshop.dev/blog/2020-04-03-adding-orbit-controls-to-react-three-fiber/
const CameraControls = ({ target = [0, 0, 0] }) => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef();
  useFrame(() => {
    controls.current.update();
  });
  return (
    <orbitControls ref={controls} args={[camera, domElement]} target={target} />
  );
};

const App = () => {
  // const [icoOpacity, setIcoOpacity] = useState(ICO_START_OPACITY);
  // const [rectOpacity, setRectOpacity] = useState(RECT_START_OPACITY);
  // const [spinSpeed, setSpinSpeed] = useState(START_SPIN_SPEED);

  // const handleUpdateControls = (e) => {
  //   if (e.target.name === "icosahedronOpacity") {
  //     setIcoOpacity(e.target.value);
  //   }
  //   if (e.target.name === "rectanglesOpacity") {
  //     setRectOpacity(e.target.value);
  //   }
  //   if (e.target.name === "spinSpeed") {
  //     setSpinSpeed(e.target.value);
  //   }
  // };

  return (
    <SnakeSequencer>
      <Canvas
        camera={{
          position: [0,5, 10],
        }}
      >
        <CameraControls target={[0, 0, 0]} />
        <ambientLight />
        <directionalLight position={[-10, 20, 40]} />
        <directionalLight position={[2, -3, -4]} />
        <Snake position={[-Math.sqrt(2)*3.5-0.5,Math.sqrt(2)/4 + 4,0]} segments={24} rotation={[Math.pi,0,-Math.pi/4]}/>
        <InfiniteGridHelper color={new THREE.Color(0x00ccff)} />

      </Canvas>

      <div className="source">
        <a href="https://github.com/jessefischer/rubiks-snake">
          Source / Credits
        </a>
      </div>

    </SnakeSequencer>
  );
};

export default App;
