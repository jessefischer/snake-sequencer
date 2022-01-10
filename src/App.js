import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import * as Tone from "tone";

import InfiniteGridHelper from "./lib/InfiniteGridHelper";
import Tonality from "./lib/tonality";

import "./App.css";

import { COLORS } from "./constants/constants";
import { DEFAULTS } from "./constants/defaults";

import Snake from "./components/Snake";
import Controls from "./components/Controls";

const App = () => {
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [bpm, setBpm] = useState(DEFAULTS.bpm);
  const [root, setRoot] = useState(DEFAULTS.root);
  const [segments, setSegments] = useState(DEFAULTS.segments);
  const [autorotate, setAutorotate] = useState(DEFAULTS.autorotate);
  const [tonality, setTonality] = useState(DEFAULTS.tonality);

  const synth = useRef();
  const [index, setIndex] = useState(0);

  const [rotations, setRotations] = useState(Array(segments).fill(0));
  const [sequence, setSequence] = useState(Array(segments).fill(0));

  useEffect(() => {
    synth.current = new Tone.Synth().toDestination();
  }, []);

  useEffect(() => {
    setRotations(
      segments <= rotations.length
        ? rotations.slice(0, segments)
        : [...rotations, ...Array(segments - rotations.length).fill(0)]
    );
    setSequence(
      segments <= sequence.length
        ? sequence.slice(0, segments)
        : [...sequence, ...Array(segments - sequence.length).fill(0)]
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segments]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  useEffect(() => {
    const loop = new Tone.Sequence(
      (time, i) => {
        synth.current.triggerAttackRelease(
          Tonality[tonality].setTonic(root).freq(sequence[i]),
          0.1,
          time
        );
        setIndex(i);
      },
      [...Array(sequence.length).keys()], //[0...n]
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

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      handleStopStart();
    }
  };

  const handleUpdateControls = (e) => {
    const setters = {
      bpm: setBpm,
      autorotate: setAutorotate,
      segments: setSegments,
      root: setRoot,
      tonality: setTonality, //(val) => setTonality( Tonality[val].setTonic(root)),
    };
    setters[e.target.name](e.target.value);
  };

  return (
    <>
    <div className='title'>Snake Sequencer</div>
      <Canvas
        camera={{
          position: [0, 5, 10],
        }}
      >
        <OrbitControls autoRotate autoRotateSpeed={autorotate}/>
        <ambientLight />
        <directionalLight position={[-10, 20, 40]} />
        <directionalLight position={[2, -3, -4]} />
        <Snake
          position={[-Math.sqrt(2) * 3.5 - 0.5, Math.sqrt(2) / 4 + 4, 0]}
          segments={segments}
          index={0}
          rotation={[Math.PI, 0, -Math.PI / 4]}
          seqPosition={index}
          handleUpdateSequence={handleUpdateSequence}
        />
        <InfiniteGridHelper layers={1} color={new THREE.Color(COLORS.Cyan)} />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.35}
            luminanceSmoothing={0.9}
            height={400}
          />
        </EffectComposer>
      </Canvas>
      <Controls
        bpm={bpm}
        autorotate={autorotate}
        segments={segments}
        playing={playing}
        tonality={tonality}
        handleUpdateControls={handleUpdateControls}
        handleStopStart={handleStopStart}
      />
      <div className="source">
        <a href="https://github.com/jessefischer/rubiks-snake">
          Source / Credits
        </a>
      </div>
    </>
  );
};

export default App;
