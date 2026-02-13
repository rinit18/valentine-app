'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function ValentineQuestion({ onYes }) {
    const [noPos, setNoPos] = useState({ x: 0, y: 0 })
    const [hoverCount, setHoverCount] = useState(0)

    const moveButton = () => {
        const x = (Math.random() - 0.5) * 400
        const y = (Math.random() - 0.5) * 400
        setNoPos({ x, y })
        setHoverCount(prev => prev + 1)
    }

    const handleYes = () => {
        // Fire confetti from multiple angles
        const duration = 3000
        const end = Date.now() + duration

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff0040', '#ffccd5']
            })
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff0040', '#ffccd5']
            })
            if (Date.now() < end) requestAnimationFrame(frame)
        }
        frame()
        onYes()
    }

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel"
                style={{ padding: '3rem', borderRadius: '1.5rem', textAlign: 'center', maxWidth: '90vw' }}
            >
                <h2 style={{
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    marginBottom: '2rem',
                    color: 'var(--primary)',
                    textShadow: '0 0 20px rgba(255,0,64,0.3)',
                    fontFamily: 'var(--font-playfair)'
                }}>
                    Will you be my Valentine?
                </h2>

                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '3rem', flexWrap: 'wrap' }}>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleYes}
                        style={{
                            padding: '1rem 4rem',
                            fontSize: '1.5rem',
                            background: 'var(--primary)',
                            color: 'white',
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            boxShadow: '0 0 20px var(--primary-glow)',
                            cursor: 'pointer'
                        }}
                    >
                        Yes! ❤️
                    </motion.button>

                    <motion.button
                        animate={{ x: noPos.x, y: noPos.y }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        onHoverStart={moveButton}
                        onClick={moveButton}
                        style={{
                            padding: '1rem 4rem',
                            fontSize: '1.5rem',
                            background: 'transparent',
                            border: '2px solid var(--primary)',
                            color: 'var(--primary)',
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        {hoverCount > 5 ? "Madam Please? 🥺" : "No"}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    )
}
