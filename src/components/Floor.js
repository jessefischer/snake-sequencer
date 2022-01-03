import React from "react";

import * as THREE from "three";

const FLOOR_SIZE = 8000;

const Floor = ({ color = new THREE.Color("white"), scale = 1, ...props }) => {
  return (
    <mesh {...props} scale={scale}>
      <planeGeometry args={[FLOOR_SIZE, FLOOR_SIZE]} />
      <meshStandardMaterial color={color} side={THREE.DoubleSide}/>
    </mesh>
  );
};

export default Floor;
