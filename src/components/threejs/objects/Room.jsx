'use client';

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 brunos-room-v1.glb --transform
*/

import React, { useEffect, useRef, useState } from 'react';
import { MathUtils, LoopOnce } from 'three';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera as Camera, useAnimations, useGLTF, useScroll } from '@react-three/drei';
import { motion } from 'framer-motion-3d';

import { BakedMesh, Bookshelf, Chair, CoffeeTable, Couch, Desk, Cube, Guitar, TVUnit, PetBed, Tardis } from '@/components/threejs';
import { sceneMotion } from '@/utils';

export const Room = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/3d/brunos-room-transformed.glb');
  const { actions } = useAnimations(animations, group);
  const scroll = useScroll();
  const [cube, setCube] = useState('initial');

  useEffect(() => void (actions['Camera Scroll'].play().paused = true), []);

  // reset scroll offset to the start once the room is shown and the cube is hidden
  useEffect(() => void (cube === 'hidden' && (scroll.offset = 0)), [cube]);

  useFrame((state) => {
    // console.log('cube:', cube, '  |   offset:', scroll.offset);
    const cameraAction = actions['Camera Scroll'], cubeAction = actions['Cube Animation'];

    // Play cube animation on first scroll
    if (cube === 'initial' && scroll.offset > 0) {
      cubeAction.clampWhenFinished = true;
      cubeAction.setLoop(LoopOnce).play();
      setCube('animating');
    }
    // Show room during cube animation before the cube is hidden
    else if (cube === 'animating' && cubeAction.time >= cubeAction.getClip().duration * 0.35) setCube('show room');
    // Hide cube once its animation is done
    else if (cube === 'show room' && cubeAction.time === cubeAction.getClip().duration) setCube('hidden');
    // Enable camera scroll + controls
    else if (cube === 'hidden') {
      // ref.current.material.needsUpdate = true;
      cameraAction.time = MathUtils.lerp(cameraAction.time, cameraAction.getClip().duration * scroll.offset, 0.05);
      state.camera.position.lerp({ x: state.pointer.x / 4, y: 0, z: -state.pointer.y / 4 }, 0.1);
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group name='Camera_Container' position={[20.02, 15.24, 20.01]} rotation={[1.24, 0.3, -0.74]}>
          <Camera name='TrueIsoCam_1' makeDefault={true} far={1000} near={0.1} fov={22.9} rotation={[-Math.PI / 2, 0, 0]} />
        </group>

        <motion.group name='Scene_Container' position={[0.01, -0.3, -0.01]}>
          {cube !== 'hidden' && <Cube nodes={nodes} materials={materials} />}
          {(cube === 'show room' || cube === 'hidden') && (
            <BakedMesh
              name='Room'
              geometry={nodes.Room.geometry}
              material={nodes.Room.material}
              position={[-0.01, 0.3, 0.01]}
              rotation={[Math.PI, 0, Math.PI]}
              {...sceneMotion.room}
            >
              <Bookshelf nodes={nodes} />
              <Chair nodes={nodes} />
              <CoffeeTable nodes={nodes} materials={materials} />
              <Couch nodes={nodes} materials={materials} />
              <Desk nodes={nodes} />
              <Guitar nodes={nodes} />
              <PetBed nodes={nodes} materials={materials} />
              <Tardis nodes={nodes} materials={materials} />
              <TVUnit nodes={nodes} />
            </BakedMesh>
          )}
        </motion.group>
      </group>
    </group>
  );
};

useGLTF.preload('/3d/brunos-room-transformed.glb');
