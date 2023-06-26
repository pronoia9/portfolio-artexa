import { useRef } from 'react';
import { MathUtils } from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { a as three } from '@react-spring/three';

import { dataStore } from '../../../store/dataStore';

export const Laptop = ({ hinge, ...props }) => {
  const { nodes, materials } = useGLTF('/macbook.glb');
  const { laptopOpen, setLaptopHover } = dataStore((state) => ({
    laptopOpen: state.laptopOpen,
    setLaptopHover: state.setLaptopHover,
  }));
  const groupRef = useRef();

  useFrame((state) => {
    state.camera.position.x = MathUtils.lerp(state.camera.position.x, laptopOpen ? 0 : 22.5, 0.05);
    state.camera.position.y = MathUtils.lerp(state.camera.position.y, laptopOpen ? 0 : 13, 0.05);
    state.camera.position.z = MathUtils.lerp(state.camera.position.z, laptopOpen ? -5 : -37, 0.025);
    groupRef.current.position.x = MathUtils.lerp(groupRef.current.position.x, laptopOpen ? -0.15 : 0, 0.1);
    groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, laptopOpen ? -5.55 : -4, 0.1);
  });

  // The view was auto-generated by: https://github.com/pmndrs/gltfjsx
  // Events and spring animations were added afterwards
  return (
    <group ref={groupRef} onPointerOver={(e) => (e.stopPropagation(), setLaptopHover(true))} onPointerOut={(e) => setLaptopHover(false)} dispose={null} {...props}>
      <group position={[0.026, 0.077, -0.831]} rotation={[1.586, 0, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Macbook_1.geometry} material={materials['Body Material']} />
        <mesh castShadow receiveShadow geometry={nodes.Macbook_2.geometry} material={materials['Bezel Material']} />
        <mesh castShadow receiveShadow geometry={nodes.Macbook_3.geometry} material={materials['Keys Material']} />
        <mesh castShadow receiveShadow geometry={nodes.Macbook_4.geometry} material={materials['Keys Light']} />
      </group>
      <three.group position={[0.026, 0.077, -0.811]} rotation-x={hinge}>
        <mesh castShadow receiveShadow geometry={nodes.MacbookDisplay_1.geometry} material={materials['Body Material']} />
        <mesh castShadow receiveShadow geometry={nodes.MacbookDisplay_2.geometry} material={materials['Bezel Material']} />
        <mesh castShadow receiveShadow geometry={nodes.MacbookDisplay_3.geometry} material={materials['Apple Logo']} />
        <mesh castShadow receiveShadow geometry={nodes.MacbookDisplay_4.geometry} material={materials['Camera Lens']} />
        <mesh castShadow receiveShadow geometry={nodes.MacbookDisplay_5.geometry} material={materials['Bezel Material']} />
        <mesh castShadow receiveShadow geometry={nodes.MacbookScreen.geometry} material={materials['Keys Light']} position={[0, 0.005, 0]} />
      </three.group>
    </group>
  );
};
useGLTF.preload('/macbook.glb');
