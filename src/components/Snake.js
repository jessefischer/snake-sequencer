import React, { useState, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import * as Math from "mathjs";
import SnakeSegment from "./SnakeSegment";

const Snake = ({ segments, ...props }) => {
  const ref = useRef();
  const ref2 = useRef();
  const [rotation, setRotation] = useState(0);


  useFrame(() => {
      if ( ref.current.amountToAnimate > 0 ) {
          ref.current.rotateY( Math.pi/20 );
          ref.current.amountToAnimate -= Math.pi/20;
      }
      if ( ref2.current.amountToAnimate > 0 ) {
        ref2.current.rotateY( Math.pi/20 );
        ref2.current.amountToAnimate -= Math.pi/20;
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
      <SnakeSegment color="#008000" />
      <group rotation={[0, Math.pi, Math.pi / 2]}>
        <group
          ref={ref2}
          position={[0.5, 0.5, 0]}
          onClick={(e) => handleClick(e, ref2)}
        >
          <SnakeSegment color="#808080" />
          {segments >= 2 && (
            <group rotation={[0, Math.pi, Math.pi / 2]}>
              <Snake position={[0.5, 0.5, 0]} segments={segments - 2} />
            </group>
          )}
        </group>
      </group>
    </group>
  );
};

export default Snake;
