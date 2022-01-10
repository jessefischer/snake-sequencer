const Controls = ({
  bpm,
  autorotate,
  segments,
  tonality,
  playing,
  handleUpdateControls,
  handleStopStart,
}) => {
  return (
    <div className="controls">
      <div className="controlsInner">
      <label htmlFor="bpm">bpm</label>
          <input
            type="range"
            min={20}
            max={240}
            step={4}
            name="bpm"
            value={bpm}
            onChange={handleUpdateControls}
          />
          <div>{bpm}</div>
          <label htmlFor="autorotate">autorotate</label>
          <input
            type="range"
            min={-2}
            max={2}
            step={0.01}
            name="autorotate"
            value={autorotate}
            onChange={handleUpdateControls}
          />
          <div>{autorotate}</div>
          <label htmlFor="segments">segments</label>
          <input
            type="range"
            min={4}
            max={24}
            step={1}
            name="segments"
            value={segments}
            onChange={handleUpdateControls}
          />
          <div>{segments}</div>
          <label htmlFor="tonality">Tonality</label>

        <select name="tonality" value={tonality} onChange={handleUpdateControls}>
          <option value="Major">Major</option>
          <option value="Minor">Minor</option>
          <option value="HarmonicMinor">HarmonicMinor</option>
          <option value="MelodicMinor">MelodicMinor</option>
          <option disabled></option>
          <option value="Dorian">Dorian</option>
          <option value="Phrygian">Phrygian</option>
          <option value="Lydian">Lydian</option>
          <option value="Mixolydian">Mixolydian</option>
          <option value="Aeolian">Aeolian</option>
          <option value="Locrian">Locrian</option>
          <option disabled></option>
          <option value="Pentatonic">Pentatonic</option>
          <option value="MinorPentatonic">MinorPentatonic</option>
          <option disabled></option>
          <option value="Freygish">Freygish</option>
          <option value="MiSheberakh">MiSheberakh</option>
          <option disabled></option>
          <option value="Selisir">Selisir</option>
        </select>
      </div>
      <div className="stopStart" onClick={handleStopStart}>
        {playing ? "stop" : "start"}
      </div>
    </div>
  );
};

export default Controls;
