import { useState } from "react";
import { useSpring, animated } from "@react-spring/three";

import * as Math from "mathjs";
import SnakeSegment from "./SnakeSegment";

import { COLORS } from "../constants/constants"

const Snake = ({
  segments,
  index = 0,
  seqPosition,
  handleUpdateSequence,
  ...props
}) => {
  const [rotation, setRotation] = useState(0);

  const { animatedRotation } = useSpring({
    animatedRotation: rotation * Math.pi / 2,
    config: {
      tension: 200,
      friction: 23,
    }
  })

  const { color } = useSpring({
    color:
      seqPosition === index
        ? (index % 2 ? COLORS.GreenActive : COLORS.OffWhiteActive )
        : (index % 2 ? COLORS.Green : COLORS.OffWhite ),
  });

  const AnimatedSnakeSegment = animated(SnakeSegment);

  const handleClick = (e) => {
    let newRotation = rotation;
    newRotation += (e.shiftKey ? -1 : 1)
    if ( newRotation < -1 ) {
      newRotation += 4;
    }
    if ( newRotation > 2 ) {
      newRotation -= 4;
    }
    setRotation( newRotation );
    handleUpdateSequence( index, newRotation );
    e.stopPropagation();
  };

  return (
    <animated.group onClick={handleClick} rotation-y={animatedRotation} {...props}>
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
    </animated.group>
  );
};

export default Snake;
