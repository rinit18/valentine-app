'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from '@/components/Hero'
import ValentineQuestion from '@/components/ValentineQuestion'
import Gallery from '@/components/Gallery'
import LoveLetter from '@/components/LoveLetter'
import MusicPlayer from '@/components/MusicPlayer'
import WeekNavigation from '@/components/WeekNavigation'
import DayContent from '@/components/DayContent'

export default function Home() {
  const [day, setDay] = useState(8)
  const [stage, setStage] = useState('hero')

  useEffect(() => {
    // 1. Check persistence for main Valentine flow
    const savedState = localStorage.getItem('valentineStatus')
    if (savedState === 'success') {
      setStage('success')
    }

    // 2. Set day based on current date
    const today = new Date()
    const month = today.getMonth() // 1 is Feb
    const date = today.getDate()

    if (month === 1) { // February
      if (date >= 7 && date <= 14) {
        setDay(date - 6) // Feb 7 = Day 1, etc.
      } else if (date > 14) {
        setDay(8) // Post-Valentine's
      } else {
        // Before Feb 7, maybe stay on 8 (Valentine Teaser) or 1 (Locked)
        // User asked for "specific day". If it's Feb 4, there is no active day.
        // Let's default to Day 1 (which will be locked) to show the anticipation.
        setDay(1)
      }
    } else {
      // Not Feb? Test mode or default to 1
      setDay(1)
    }
  }, [])

  const handleYes = () => {
    setStage('success')
    localStorage.setItem('valentineStatus', 'success')
    // Confetti is handled by the component or we can trigger it here too
  }

  return (
    <main style={{ width: '100%', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* Navigation at the top */}
      <WeekNavigation currentDay={day} setDay={setDay} />

      {/* Content wrapper that handles daily specific content */}
      <DayContent day={day}>
        {/* Day 8 (Valentine's Day) content is rendered here as children */}
        <AnimatePresence mode="wait">
          {stage === 'hero' && (
            <motion.div
              key="hero"
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Hero onStart={() => setStage('question')} />
            </motion.div>
          )}

          {stage === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <ValentineQuestion onYes={() => setStage('success')} />
            </motion.div>
          )}

          {stage === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{
                zIndex: 10,
                position: 'relative',
                width: '100%',
                height: '100vh',
                overflowY: 'auto',
                scrollBehavior: 'smooth'
              }}
            >
              <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <motion.h1
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', color: 'var(--primary)', marginBottom: '1rem', fontFamily: 'var(--font-playfair)', textAlign: 'center' }}
                >
                  She Said Yes! ❤️
                </motion.h1>
                <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>See you on Feb 14th!</p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, repeat: Infinity, repeatType: 'reverse', duration: 1 }}
                >
                  <span style={{ fontSize: '2rem', display: 'block', marginBottom: '2rem' }}>⬇️</span>
                </motion.div>
              </div>

              <LoveLetter />
              <Gallery />

              <footer style={{ padding: '4rem', textAlign: 'center', opacity: 0.6 }}>
                <p>Made with all my love for you</p>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </DayContent>

      {day === 8 && <MusicPlayer />}
    </main>
  )
}
