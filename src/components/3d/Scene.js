'use client'
import { Canvas } from '@react-three/fiber'
import { Stars, Sparkles, Environment, Cloud, Float } from '@react-three/drei'
import FloatingHeart from './FloatingHeart'
import { Suspense } from 'react'

export default function Scene() {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
            <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 2]} gl={{ antialias: true }}>
                {/* Warm Dramatic Lighting */}
                <ambientLight intensity={0.3} />
                <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} color="#ff0000" />
                <pointLight position={[-10, -5, -10]} intensity={1.5} color="#d90429" />
                <pointLight position={[0, 10, 5]} intensity={1} color="#ffd700" /> {/* Gold Rim Light */}

                {/* Night Environment */}
                <Environment preset="city" />

                {/* Deep Red Fog */}
                <fog attach="fog" args={['#0f0101', 8, 25]} />
                <color attach="background" args={['#0f0101']} />

                <Suspense fallback={null}>
                    {/* Stars */}
                    <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1} />

                    {/* Gold & Red Sparkles */}
                    <Sparkles count={300} scale={18} size={4} speed={0.4} opacity={0.7} color="#ffd700" />

                    {/* Dramatic Clouds */}
                    <Cloud position={[-5, -2, -12]} speed={0.2} opacity={0.3} segments={15} bounds={[12, 3, 3]} color="#590d22" />
                    <Cloud position={[5, 3, -18]} speed={0.2} opacity={0.3} segments={15} bounds={[12, 3, 3]} color="#800f2f" />

                    {/* Floating Hearts - Ruby & Gold Theme */}
                    <group>
                        {Array.from({ length: 45 }).map((_, i) => (
                            <Float speed={2} rotationIntensity={1.5} floatIntensity={2.5} key={i}>
                                <FloatingHeart
                                    position={[
                                        (Math.random() - 0.5) * 28,
                                        (Math.random() - 0.5) * 28,
                                        (Math.random() - 0.5) * 18 - 5
                                    ]}
                                    scale={0.12 + Math.random() * 0.18}
                                    color={
                                        Math.random() > 0.8 ? "#ffd700" : // 20% Gold hearts
                                            Math.random() > 0.4 ? "#d90429" : // Ruby Red
                                                "#ef233c" // Bright Red
                                    }
                                    speed={0.3 + Math.random() * 0.7}
                                />
                            </Float>
                        ))}
                    </group>
                </Suspense>
            </Canvas>
        </div>
    )
}
