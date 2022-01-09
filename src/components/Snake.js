import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";

import * as Math from "mathjs";
import SnakeSegment from "./SnakeSegment";

const Snake = ({
  segments,
  index = 0,
  seqPosition,
  handleUpdateSequence,
  ...props
}) => {
  const ref = useRef();
  const [rotation, setRotation] = useState(0);

  const { color } = useSpring({
    color:
      seqPosition === index
        ? (index % 2
          ? "#00C000"
          : "#C0C0C0")
        : (index % 2
          ? "#008000"
          : "#808080"),
  });

  const AnimatedSnakeSegment = animated(SnakeSegment);

  useFrame(() => {
    if (ref.current.amountToAnimate > 0) {
      ref.current.rotateY(Math.pi / 20);
      ref.current.amountToAnimate -= Math.pi / 20;
    } else if (ref.current.amountToAnimate < 0) {
      ref.current.rotateY(-Math.pi / 20);
      ref.current.amountToAnimate += Math.pi / 20;
    }
  });

  const handleClick = (e, r) => {
    if (!r.current.amountToAnimate || r.current.amountToAnimate !== 0) {
      if (e.shiftKey) {
        r.current.amountToAnimate = -Math.pi / 2;
        setRotation((rotation - 1 + 4) % 4);
        handleUpdateSequence(index, -1);
      } else {
        r.current.amountToAnimate = Math.pi / 2;
        setRotation((rotation + 1) % 4);
        handleUpdateSequence(index, 1);
      }
    }

    e.stopPropagation();
  };

  return (
    <group ref={ref} onClick={(e) => handleClick(e, ref)} {...props}>
      <AnimatedSnakeSegment color={color} />
      <group rotation={[0, Math.pi, Math.pi / 2]}>
        {segments > 1 && (
          <Snake
            position={[0.5, 0.5, 0]}
            index={index + 1}
            segments={segments - 1}
            seqPosition={seqPosition}
            handleUpdateSequence={handleUpdateSequence}
          />
        )}
      </group>
    </group>
  );
};

export default Snake;
