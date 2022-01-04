import React, { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import * as Math from "mathjs";
import SnakeSegment from "./SnakeSegment";

const Snake = ({ segments, index = 0, ...props }) => {
  const ref = useRef();
  const [rotation, setRotation] = useState(0);

  useFrame(() => {
      if ( ref.current.amountToAnimate > 0 ) {
          ref.current.rotateY( Math.pi/20 );
          ref.current.amountToAnimate -= Math.pi/20;
      }
  });

  const handleClick = (e, r) => {
      // if (e.shiftKey) ...
      if ( !r.current.amountToAnimate || r.current.amountToAnimate <=0 )
      r.current.amountToAnimate = Math.pi / 2;

    //r.current.rotateY(Math.pi / 2); // 90 degrees
    setRotation((rotation + 1) % 4);
    e.stopPropagation();
  };

  return (
    <group ref={ref} onClick={(e) => handleClick(e, ref)} {...props}>
      <SnakeSegment color={index % 2 ? "#008000" : "#808080"} />
      <group rotation={[0, Math.pi, Math.pi / 2]}>
        {segments > 1 && (
          <Snake position={[0.5, 0.5, 0]} index={index + 1} segments={segments - 1} />
        )}
      </group>
    </group>
  );
};

export default Snake;
