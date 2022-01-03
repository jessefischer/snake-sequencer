import React, { useState, useRef } from "react";
import { useThree } from "@react-three/fiber";

import * as Math from "mathjs";
import * as THREE from "three";

const SnakeSegment = ({ color, inverted = false, ...props }) => {
  const ref = useRef();
  const [rotation, setRotation] = useState(0);

  // const handleClick = (e) => {
  //   ref.current.rotateY(Math.pi / 2); // 90 degrees
  //   setRotation( (rotation + 1) % 4 );
  //   e.stopPropagation();
  // };

  return (
    <group ref={ref} {...props}>
      <TriangularPrism position={[-0.5, 0, -0.5]} inverted={inverted} color={color} />
    </group>
  );
};

const TriangularPrism = ({ color, inverted = false, ...props }) => {
  const triangle = inverted
    ? new THREE.Shape([
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0, 1),
        new THREE.Vector2(1, 1),
      ])
    : new THREE.Shape([
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1, 0),
        new THREE.Vector2(1, 1),
      ]);

  const extrudeSettings = {
    steps: 1,
    depth: 1,
    bevelEnabled: false,
  };

  return (
    <mesh {...props}>
      <extrudeGeometry args={[triangle, extrudeSettings]} />
      <meshStandardMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default SnakeSegment;
