import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Countdown from './Countdown'

export default function Hero({ onStart }) {
    const [typedText, setTypedText] = useState('')
    const fullText = "Happy Valentine's Day"

    useEffect(() => {
        let index = 0
        const interval = setInterval(() => {
            setTypedText(fullText.slice(0, index + 1))
            index++
            if (index > fullText.length) clearInterval(interval)
        }, 100)
        return () => clearInterval(interval)
    }, [])

    return (
        <section style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="glass-panel"
                style={{ padding: '3rem', borderRadius: '2rem', maxWidth: '800px', margin: '1rem' }}
            >
                <div style={{ minHeight: '8rem' }}>
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                            fontFamily: 'var(--font-playfair)',
                            fontWeight: '400',
                            background: 'linear-gradient(135deg, #ff0000 0%, #d90429 50%, #ffd700 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '1.5rem',
                            filter: 'drop-shadow(0 0 20px rgba(217, 4, 41, 0.5))'
                        }}
                    >
                        {typedText}
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            style={{ color: '#ffd700' }}
                        >
                            |
                        </motion.span>
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 0.8 }}
                    style={{
                        fontSize: '0.9rem',
                        marginBottom: '3rem',
                        color: 'rgba(255,255,255,0.8)',
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                    }}
                >
                    I have a special question for you...
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3 }}
                    onClick={() => {
                        window.dispatchEvent(new Event('startMusic'));
                        onStart();
                    }}
                    style={{
                        padding: '1rem 3rem',
                        fontSize: '1.5rem',
                        background: 'linear-gradient(45deg, #d90429, #ef233c)',
                        color: 'white',
                        borderRadius: '50px',
                        boxShadow: '0 0 20px rgba(217, 4, 41, 0.6)',
                        fontWeight: 'bold',
                        border: '1px solid #ffd700'
                    }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px #ff0000' }}
                    whileTap={{ scale: 0.95 }}
                >
                    Open My Heart
                </motion.button>
            </motion.div>
        </section>
    )
}
