'use client';

import { useEffect, useRef } from 'react';
import { Color, Vector2 } from 'three';
import { extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

extend({
  SteamShaderMaterial: shaderMaterial(
    {
      uTime: 0,
      uTimeFrequency: 0.0004,
      uUvFrequency: new Vector2(4, 5),
      uColor: new Color('#d2958a'),
    },
    `
    uniform float uTime;
    varying vec2 vUv;

    vec2 fade(vec2 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

    vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

    float perlin2d(vec2 P) {
      vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
      vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
      Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
      vec4 ix = Pi.xzxz;
      vec4 iy = Pi.yyww;
      vec4 fx = Pf.xzxz;
      vec4 fy = Pf.yyww;
      vec4 i = permute(permute(ix) + iy);
      vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
      vec4 gy = abs(gx) - 0.5;
      vec4 tx = floor(gx + 0.5);
      gx = gx - tx;
      vec2 g00 = vec2(gx.x, gy.x);
      vec2 g10 = vec2(gx.y, gy.y);
      vec2 g01 = vec2(gx.z, gy.z);
      vec2 g11 = vec2(gx.w, gy.w);
      vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
      g00 *= norm.x;
      g01 *= norm.y;
      g10 *= norm.z;
      g11 *= norm.w;
      float n00 = dot(g00, vec2(fx.x, fy.x));
      float n10 = dot(g10, vec2(fx.y, fy.y));
      float n01 = dot(g01, vec2(fx.z, fy.z));
      float n11 = dot(g11, vec2(fx.w, fy.w));
      vec2 fade_xy = fade(Pf.xy);
      vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
      float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
      return 2.3 * n_xy;
    }

    void main() {
      vec3 newPosition = position;
      vec2 displacementUv = uv;
      displacementUv *= 5.0;
      displacementUv.y -= uTime * 0.0002;

      float displacementStrength = pow(uv.y * 3.0, 2.0);
      float perlin = perlin2d(displacementUv) * displacementStrength;

      newPosition.y += perlin * 0.1;

      vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectionPosition = projectionMatrix * viewPosition;
      gl_Position = projectionPosition;

      vUv = uv;
    }
    `,
    `
    uniform float uTime;
    uniform float uTimeFrequency;
    uniform vec2 uUvFrequency;
    uniform vec3 uColor;
    varying vec2 vUv;

    vec2 fade(vec2 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

    vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

    float perlin2d(vec2 P) {
      vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
      vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
      Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
      vec4 ix = Pi.xzxz;
      vec4 iy = Pi.yyww;
      vec4 fx = Pf.xzxz;
      vec4 fy = Pf.yyww;
      vec4 i = permute(permute(ix) + iy);
      vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
      vec4 gy = abs(gx) - 0.5;
      vec4 tx = floor(gx + 0.5);
      gx = gx - tx;
      vec2 g00 = vec2(gx.x, gy.x);
      vec2 g10 = vec2(gx.y, gy.y);
      vec2 g01 = vec2(gx.z, gy.z);
      vec2 g11 = vec2(gx.w, gy.w);
      vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
      g00 *= norm.x;
      g01 *= norm.y;
      g10 *= norm.z;
      g11 *= norm.w;
      float n00 = dot(g00, vec2(fx.x, fy.x));
      float n10 = dot(g10, vec2(fx.y, fy.y));
      float n01 = dot(g01, vec2(fx.z, fy.z));
      float n11 = dot(g11, vec2(fx.w, fy.w));
      vec2 fade_xy = fade(Pf.xy);
      vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
      float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
      return 2.3 * n_xy;
    }

    void main() {
      vec2 uv = vUv * uUvFrequency;
      uv.y -= uTime * uTimeFrequency;

      float borderAlpha = min(vUv.x * 4.0, (1.0 - vUv.x) * 4.0);
      borderAlpha = borderAlpha * (1.0 - vUv.y);

      float perlin = perlin2d(uv);
      perlin *= borderAlpha;
      perlin *= 0.6;
      perlin = min(perlin, 1.0);

      gl_FragColor = vec4(uColor, perlin);
    }`
  ),
});

export function SteamMaterial() {
  const ref = useRef();

  useEffect(() => {
    ref?.current && (ref.current.transparent = true);
    ref?.current && (ref.current.depthWrite = false);
  }, []);

  useFrame((state, delta) => {
    ref.current.uTime += delta * 500;
  });

  return <steamShaderMaterial ref={ref} />;
}