import * as THREE from 'three'
import { animated, useSpring } from '@react-spring/three';
import { Canvas, ThreeElements, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";

function Scene(props: ThreeElements['mesh'] & { open: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const {viewport } = useThree()

  const spring = useSpring({ 
    x: props.open ? viewport.width*0.2 : 0
  });

  useFrame((three, delta) => {
    meshRef.current.rotation.x += delta
  });

  return (
    <animated.group position-x={spring.x}>
      <mesh
        {...props}
        ref={meshRef}
        scale={active ? 1.5 : 1}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    </animated.group>
  )
}


function SceneWrapper({ open }: { open: boolean }) {
  return (
    <Canvas style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
      <Scene open={open} />
      <ambientLight />
    </Canvas>
  )
}
export default SceneWrapper;