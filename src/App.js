import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import InfiniteGridHelper from "./lib/InfiniteGridHelper";

import "./App.css";

import Snake from "./components/Snake";

import * as Tone from "tone";
import * as Math from "mathjs";

extend({ OrbitControls });

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
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [seqPosition, setSeqPosition] = useState(0);
  const [bpm] = useState(120);

  const synth = useRef(new Tone.Synth().toDestination());

  const notes = ["C3", "D3", "E3", "F3", "G3", "G#3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "G#4", "A4", "B4"];

  useEffect(() => {
    new Tone.Sequence((time, note) => {
      synth.current.triggerAttackRelease(note, 0.1, time);
      const [bars, beats] = Tone.Transport.position.split(":");
      setSeqPosition( (Number( bars % Math.floor( notes.length / 4)) * 4)  + Number( beats ) );
    }, notes, "4n").start(0);
  }, [notes]);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm * 2;
  }, [bpm]);

  const handleStopStart = () => {
    if (!started) {
      setStarted(true);
      Tone.start();
    }
    if (!playing) {
      setPlaying(true);
      Tone.Transport.start();
    } else {
      setPlaying(false);
      Tone.Transport.stop();
    }
  };

  return (
    <>
      <Canvas
        camera={{
          position: [0, 5, 10],
        }}
      >
        <CameraControls target={[0, 0, 0]} />
        <ambientLight />
        <directionalLight position={[-10, 20, 40]} />
        <directionalLight position={[2, -3, -4]} />
        <Snake
          position={[-Math.sqrt(2) * 3.5 - 0.5, Math.sqrt(2) / 4 + 4, 0]}
          segments={16}
          index={0}
          rotation={[Math.pi, 0, -Math.pi / 4]}
          seqPosition={seqPosition}
        />
        <InfiniteGridHelper color={new THREE.Color(0x00ccff)} />
      </Canvas>
      <div className="source">
        <a href="https://github.com/jessefischer/rubiks-snake">
          Source / Credits
        </a>
      </div>
      <div className="controls" onClick={handleStopStart}>
        {playing ? "stop" : "start"}
      </div>
    </>
  );
};

export default App;
