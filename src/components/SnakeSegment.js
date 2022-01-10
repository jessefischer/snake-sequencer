import * as THREE from "three";

const SnakeSegment = ({ color, ...props }) => {
  return (
    <group {...props}>
      <TriangularPrism position={[-0.5, 0, -0.5]} color={color} />
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
