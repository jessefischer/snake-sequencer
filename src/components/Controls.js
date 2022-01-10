const Controls = ({
  bpm,
  autorotate,
  segments,
  playing,
  handleUpdateControls,
  handleStopStart,
}) => {
  return (
    <div className="controls">
      <div className="controlsInner">
        <div>
          <input
            type="range"
            min={20}
            max={240}
            step={1}
            name="bpm"
            value={bpm}
            onChange={handleUpdateControls}
          />
          <label htmlFor="bpm">bpm</label>
        </div>
        <div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            name="autorotate"
            value={autorotate}
            onChange={handleUpdateControls}
          />
          <label htmlFor="autorotate">autorotate</label>
        </div>
        <div>
          <input
            type="range"
            min={4}
            max={24}
            step={1}
            name="segments"
            value={segments}
            onChange={handleUpdateControls}
          />
          <label htmlFor="segments">segments</label>
        </div>
      </div>
      <div className="stopStart" onClick={handleStopStart}>
        {playing ? "stop" : "start"}
      </div>
    </div>
  );
};

export default Controls;
