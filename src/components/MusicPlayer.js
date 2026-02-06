'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function MusicPlayer() {
    const [playing, setPlaying] = useState(false)
    const audioRef = useRef(null)

    useEffect(() => {
        // Attempt to play on mount (will likely be blocked by browser without interaction)
        // But we check if it's allowed.
        const playAudio = async () => {
            try {
                if (audioRef.current) {
                    audioRef.current.volume = 0.5;
                    await audioRef.current.play();
                    setPlaying(true);
                }
            } catch (err) {
                console.log("Autoplay blocked, waiting for interaction");
            }
        }
        playAudio();

        // Listen for a custom event 'startMusic' dispatched from Hero or other components
        const handleStart = () => {
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play().then(() => setPlaying(true)).catch(e => console.error(e));
            }
        }
        window.addEventListener('startMusic', handleStart);
        return () => window.removeEventListener('startMusic', handleStart);
    }, [])

    const toggle = () => {
        if (playing) {
            audioRef.current.pause()
        } else {
            audioRef.current.play().catch(e => console.error("Playback failed", e))
        }
        setPlaying(!playing)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 100 }}
        >
            <audio ref={audioRef} src="/music.mp3" loop />

            <motion.button
                onClick={toggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="glass"
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    boxShadow: playing ? '0 0 20px var(--primary)' : 'none',
                    border: playing ? '2px solid var(--primary)' : '1px solid var(--glass-border)'
                }}
            >
                {playing ? '🎵' : '🔇'}
            </motion.button>
        </motion.div>
    )
}
