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
  const [bpm] = useState(120);
  const [root] = useState(60);

  const synth = useRef();
  const [index, setIndex] = useState(0);

  const [sequence, setSequence] = useState(Array(16).fill(0));

  useEffect(() => {
    synth.current = new Tone.Synth().toDestination();
  }, []);

  useEffect(() => {
    const loop = new Tone.Sequence(
      (time, i) => {
        synth.current.triggerAttackRelease(
          Tone.Frequency(root + sequence[i], "midi").toFrequency(),
          0.1,
          time
        );
        setIndex(i);
      },
      [...Array(sequence.length).keys()],
      "8n"
    );
    loop.start(0);
    return () => loop.dispose();
  }, [sequence, root]);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
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

  const handleUpdateSequence = (index, delta) => {
    const newSequence = sequence.slice();
    for (let i = index; i < newSequence.length; i++) {
      newSequence[i] += delta;
    }
    setSequence(newSequence);
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
          seqPosition={index}
          handleUpdateSequence={handleUpdateSequence}
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
