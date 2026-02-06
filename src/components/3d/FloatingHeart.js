'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function FloatingHeart({ position = [0, 0, 0], scale = 1, color = '#ff0040', speed = 0.5, ...props }) {
    const meshRef = useRef()

    // Create Heart Shape
    const heartShape = useMemo(() => {
        const x = 0, y = 0
        const shape = new THREE.Shape()
        shape.moveTo(x + 0.5, y + 0.5)
        shape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y)
        shape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7)
        shape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9)
        shape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7)
        shape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y)
        shape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5)
        return shape
    }, [])

    const geometryArgs = useMemo(() => [heartShape, {
        depth: 0.4, // Thicker for better refraction
        bevelEnabled: true,
        bevelSegments: 5, // Smoother bevel
        steps: 2,
        bevelSize: 0.1,
        bevelThickness: 0.1
    }], [heartShape])

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * speed
            meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.1
            // Floating motion
            meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.005
        }
    })

    return (
        <mesh ref={meshRef} position={position} scale={scale} rotation={[0, 0, Math.PI]} {...props}>
            <extrudeGeometry args={geometryArgs} />
            {/* Premium Glass/Gem Material */}
            <meshPhysicalMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.2}
                roughness={0.1}
                metalness={0.1}
                transmission={0.6} // Glass-like transparency
                thickness={2} // Refraction depth
                clearcoat={1}
                clearcoatRoughness={0}
                ior={1.5} // Refraction index like glass/gem
            />
        </mesh>
    )
}
