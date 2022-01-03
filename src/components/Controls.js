import React from "react";

const Controls = ({ icoValue, rectValue, spinSpeed, handleUpdateControls }) => {
  return (
    <div className="controls">
      <div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          name="icosahedronOpacity"
          value={icoValue}
          onChange={handleUpdateControls}
        />
        <label htmlFor="icosahedronOpacity">Icosahedron</label>
      </div>
      <div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          name="rectanglesOpacity"
          value={rectValue}
          onChange={handleUpdateControls}
        />
        <label htmlFor="rectanglesOpacity">Golden Rectangles</label>
      </div>
      <div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          name="spinSpeed"
          value={spinSpeed}
          onChange={handleUpdateControls}
        />
        <label htmlFor="spinSpeed">Spin Speed</label>
      </div>
    </div>
  );
};

export default Controls;
