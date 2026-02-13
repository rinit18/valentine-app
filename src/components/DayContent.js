import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useEffect, useState } from 'react'

export default function DayContent({ day, children }) {
    const [proposalAccepted, setProposalAccepted] = useState(false)

    // Effect for specific days
    useEffect(() => {
        // Check Propose Day status
        if (day === 2) {
            const saved = localStorage.getItem('proposeDayStatus')
            if (saved === 'true') setProposalAccepted(true)
        }

        if (day === 1) { // Rose Day - Petals
            const interval = setInterval(() => {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#ff0000', '#d90429'],
                    shapes: ['circle'],
                    scalar: 2
                })
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#ff0000', '#d90429'],
                    shapes: ['circle'],
                    scalar: 2
                })
            }, 300)
            return () => clearInterval(interval)
        }
        if (day === 3) { // Chocolate Day
            const interval = setInterval(() => {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#5D4037', '#8D6E63', '#D7CCC8'],
                    shapes: ['square']
                })
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#5D4037', '#8D6E63', '#D7CCC8'],
                    shapes: ['square']
                })
            }, 200)
            return () => clearInterval(interval)
        }
    }, [day])

    const containerStyle = {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
    }

    const titleStyle = {
        fontSize: 'clamp(3rem, 5vw, 5rem)',
        fontFamily: 'var(--font-playfair)',
        background: 'linear-gradient(to right, #d90429, #ffd700)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '2rem',
        filter: 'drop-shadow(0 0 20px rgba(217, 4, 41, 0.5))',
        lineHeight: 1.2
    }

    const cardStyle = {
        background: 'rgba(255, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 215, 0, 0.3)',
        borderRadius: '2rem',
        padding: '3rem',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        maxWidth: '800px',
        width: '100%'
    }

    // Day 8 (Valentine's) is handled by the main page flow passed as children
    if (day === 8) return <>{children}</>

    return (
        <motion.div
            key={day}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            style={containerStyle}
        >
            {day === 1 && ( // Rose Day
                <div style={cardStyle}>
                    <h1 style={titleStyle}>Happy Rose Day 🌹</h1>
                    <motion.div
                        animate={{
                            rotate: [0, 10, 0, -10, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ repeat: Infinity, duration: 5 }}
                        style={{ fontSize: '12rem', margin: '2rem 0', filter: 'drop-shadow(0 0 50px rgba(255,0,0,0.6))' }}
                    >
                        🌹
                    </motion.div>
                    <p style={{ fontSize: '1.8rem', fontStyle: 'italic', color: '#ffbdc9' }}>
                        "Like a rose, my love for you blooms more beautiful every day."
                    </p>
                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        {[...Array(5)].map((_, i) => (
                            <motion.span
                                key={i}
                                animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                                transition={{ delay: i * 0.2, repeat: Infinity, duration: 2 }}
                                style={{ fontSize: '2rem' }}
                            >
                                ✨
                            </motion.span>
                        ))}
                    </div>
                </div>
            )}

            {day === 2 && ( // Propose Day
                <div style={{ ...cardStyle, border: '2px solid #ffd700' }}>
                    <h1 style={titleStyle}>Propose Day 💍</h1>

                    {!proposalAccepted ? (
                        <>
                            <p style={{ fontSize: '2rem', fontStyle: 'italic', marginBottom: '3rem', color: '#fff' }}>
                                "I have a question that's been in my heart...<br />
                                <span style={{ color: '#ffd700', fontWeight: 'bold' }}>Will you be mine forever?</span>"
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.1, boxShadow: '0 0 50px #ffd700' }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '1.5rem 4rem',
                                    background: 'linear-gradient(45deg, #ffd700, #ffaa00)',
                                    color: 'black',
                                    borderRadius: '50px',
                                    fontWeight: 'bold',
                                    fontSize: '1.5rem',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ['#ffd700', '#ffffff'] })
                                    setProposalAccepted(true)
                                    localStorage.setItem('proposeDayStatus', 'true')
                                }}
                            >
                                YES! 💍
                            </motion.button>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ffd700', marginBottom: '2rem' }}>
                                She Said YES! 💍✨
                            </p>
                            <p style={{ fontSize: '1.5rem', color: '#eee' }}>
                                My heart is yours, forever.
                            </p>
                        </motion.div>
                    )}
                </div>
            )}

            {day === 3 && ( // Chocolate Day
                <div style={{ ...cardStyle, background: 'rgba(62, 39, 35, 0.4)' }}>
                    <h1 style={{ ...titleStyle, background: 'linear-gradient(to right, #D2691E, #8D6E63)' }}>Happy Chocolate Day 🍫</h1>
                    <p style={{ fontSize: '1.8rem', color: '#EFEBE9' }}>Objectively sweeter than any chocolate... is YOU.</p>
                    <div style={{ display: 'flex', gap: '2rem', marginTop: '4rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {['🍫', '🍪', '🍩', '🧁', '🍬'].map((emoji, i) => (
                            <motion.div
                                key={i}
                                animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 + i * 0.2 }}
                                style={{ fontSize: '6rem', cursor: 'pointer' }}
                                whileHover={{ scale: 1.5, rotate: 360 }}
                            >
                                {emoji}
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {day === 4 && ( // Teddy Day
                <div style={cardStyle}>
                    <h1 style={titleStyle}>Happy Teddy Day 🧸</h1>
                    <motion.div
                        whileHover={{ scale: 1.3, rotate: [0, 10, -10, 0] }}
                        drag
                        dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                        style={{ fontSize: '12rem', cursor: 'grab', display: 'inline-block', filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.2))' }}
                    >
                        🧸
                    </motion.div>
                    <p style={{ fontSize: '1.5rem', marginTop: '2rem', color: '#ffd700' }}>
                        (You can drag the teddy!)
                    </p>
                    <p style={{ fontSize: '2rem', marginTop: '2rem' }}>
                        Sending you the biggest, softest warm bear hug!
                    </p>
                </div>
            )}

            {day === 5 && ( // Promise Day
                <div style={{ ...cardStyle, maxWidth: '900px' }}>
                    <h1 style={titleStyle}>Promise Day 🤞</h1>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', textAlign: 'left' }}>
                        {[
                            "To always make you smile 😊",
                            "To support your wildest dreams 🚀",
                            "To cook you good food 🍝",
                            "To love you endlessly ❤️"
                        ].map((promise, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.5 }}
                                whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
                                style={{
                                    padding: '1.5rem',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '1rem',
                                    fontSize: '1.2rem'
                                }}
                            >
                                ✨ I Promise...<br />
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffd700' }}>{promise}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {day === 6 && ( // Hug Day
                <div style={cardStyle}>
                    <h1 style={titleStyle}>Happy Hug Day 🤗</h1>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '10rem' }}>
                        <motion.div
                            animate={{ x: [0, 50, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                        >
                            🫂
                        </motion.div>
                    </div>
                    <p style={{ fontSize: '1.8rem', marginTop: '3rem' }}>
                        Imagine my arms wrapped around you... tight!
                    </p>
                </div>
            )}

            {day === 7 && ( // Kiss Day
                <div style={cardStyle}>
                    <h1 style={titleStyle}>Happy Kiss Day 💋</h1>
                    <motion.div
                        animate={{ scale: [1, 1.2, 0.9, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        style={{ fontSize: '10rem', marginBottom: '2rem' }}
                    >
                        😘
                    </motion.div>
                    <p style={{ fontSize: '2rem', color: '#ff0055' }}>
                        Sending you a Infinite kisses!
                    </p>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden' }}>
                        {/* Floating Kisses */}
                        {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 500, x: Math.random() * 1000 - 500, rotate: 0 }}
                                animate={{ opacity: [0, 1, 0], y: -500, rotate: Math.random() * 360 }}
                                transition={{ repeat: Infinity, duration: 3 + Math.random() * 2, delay: Math.random() * 2 }}
                                style={{ position: 'absolute', top: '50%', left: '50%', fontSize: `${2 + Math.random() * 3}rem` }}
                            >
                                💋
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    )
}
