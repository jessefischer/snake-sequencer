import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

import * as THREE from "three";

// From https://github.com/Fyrestar/THREE.InfiniteGridHelper

const InfiniteGridHelper = ({
  layers = 0,
  size1 = 1,
  size2 = 10,
  color = new THREE.Color("white"),
  distance = 8000,
  axes = "xzy",
}) => {
  const planeAxes = axes.substr(0, 2);

  const { camera } = useThree();

  useEffect(() => {
    camera.layers.enable(0);
    camera.layers.enable(1);
  }, [camera.layers]);

  const VERTEX_SHADER = `
           
varying vec3 worldPosition;

uniform float uDistance;

void main() {

     vec3 pos = position.${axes} * uDistance;
     pos.${planeAxes} += cameraPosition.${planeAxes};
     
     worldPosition = pos;
     
     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

}
`;

  const FRAGMENT_SHADER = `
           
varying vec3 worldPosition;

uniform float uSize1;
uniform float uSize2;
uniform vec3 uColor;
uniform float uDistance;
 
 
 
 float getGrid(float size) {
 
     vec2 r = worldPosition.${planeAxes} / size;
     
     
     vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
     float line = min(grid.x, grid.y);
     
 
     return 1.0 - min(line, 1.0);
 }
 
void main() {

     
       float d = 1.0 - min(distance(cameraPosition.${planeAxes}, worldPosition.${planeAxes}) / uDistance, 1.0);
     
       float g1 = getGrid(uSize1);
       float g2 = getGrid(uSize2);
       
       
       gl_FragColor = vec4(uColor.rgb, mix(g2, g1, g1) * pow(d, 3.0));
       gl_FragColor.a = mix(0.5 * gl_FragColor.a, gl_FragColor.a, g2);
     
       if ( gl_FragColor.a <= 0.0 ) discard;
     

}

`;

  return (
    <mesh layers={layers}>
      <shaderMaterial
        args={[
          {
            side: THREE.DoubleSide,
            uniforms: {
              uSize1: { value: size1 },
              uSize2: { value: size2 },
              uColor: { value: color },
              uDistance: { value: distance },
            },
            extensions: { derivatives: true },
            transparent: true,

            vertexShader: VERTEX_SHADER,

            fragmentShader: FRAGMENT_SHADER,
          },
        ]}
      />
      <planeBufferGeometry />
    </mesh>
  );
};

export default InfiniteGridHelper;
