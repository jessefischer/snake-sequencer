import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import InfiniteGridHelper from "./lib/InfiniteGridHelper";
import Tonality from "./lib/tonality";

import "./App.css";

import Snake from "./components/Snake";

import * as Tone from "tone";

const App = () => {
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [bpm] = useState(120);
  const [root] = useState(60);
  const [tonality] = useState(Tonality.Pentatonic);

  const synth = useRef();
  const [index, setIndex] = useState(0);

  const [rotations, setRotations] = useState(Array(16).fill(0));
  const [sequence, setSequence] = useState(Array(16).fill(0));

  useEffect(() => {
    synth.current = new Tone.Synth().toDestination();
  }, []);

  // useEffect(() => {
  //   window.addEventListener( "keydown", handleKeyDown );
  // }, [playing]);

  useEffect(() => {
    const loop = new Tone.Sequence(
      (time, i) => {
        synth.current.triggerAttackRelease(
          tonality.freq(sequence[i]),
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
  }, [sequence, root, tonality]);

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

  const handleUpdateSequence = (index, rotation) => {
    const newRotations = rotations.slice();
    const newSequence = sequence.slice();
    newRotations[index] = rotation;
    setRotations(newRotations);
    for (let i = 1; i < newRotations.length; i++) {
      newSequence[i] = newSequence[i - 1] + newRotations[i];
    }
    setSequence(newSequence);
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === " ") {
  //     handleStopStart();
  //   }
  // };

  return (
    <>
      <Canvas
        camera={{
          position: [0, 5, 10],
        }}
      >
        <OrbitControls />
        <ambientLight />
        <directionalLight position={[-10, 20, 40]} />
        <directionalLight position={[2, -3, -4]} />
        <Snake
          position={[-Math.sqrt(2) * 3.5 - 0.5, Math.sqrt(2) / 4 + 4, 0]}
          segments={16}
          index={0}
          rotation={[Math.PI, 0, -Math.PI / 4]}
          seqPosition={index}
          handleUpdateSequence={handleUpdateSequence}
        />
        <InfiniteGridHelper layers={1} color={new THREE.Color(0x00ccff)} />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.35}
            luminanceSmoothing={0.9}
            height={400}
          />
        </EffectComposer>
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
