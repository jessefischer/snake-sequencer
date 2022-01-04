import React, { useRef } from "react";

import * as Tone from 'tone';

const SnakeSequencer = (props) => {
    const synth = useRef( new Tone.Synth().toDestination() );

    const handleStart = (e) => {
        synth.current.triggerAttackRelease( "C4", "8n", Tone.now());
    }

    return <>
    {props.children}
    <div className="controls" onClick={handleStart}>start</div>
    </>;
}

export default SnakeSequencer;