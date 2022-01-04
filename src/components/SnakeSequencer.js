import React, { useEffect, useRef, useState } from "react";

import * as Tone from "tone";

const SnakeSequencer = (props) => {
  const synth = useRef(new Tone.Synth().toDestination());
  const [started, setStarted] = useState();
  const [playing, setPlaying] = useState();
  const [bpm, setBpm] = useState(120);

  const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];

  useEffect(() => {
    new Tone.Sequence((time, note) => {
      synth.current.triggerAttackRelease(note, 0.1, time);
    }, notes).start(0);
  }, []);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  const handleStopStart = (e) => {
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
      {props.children}
      <div className="controls" onClick={handleStopStart}>
        {playing ? "stop" : "start"}
      </div>
    </>
  );
};

export default SnakeSequencer;
