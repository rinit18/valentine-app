'use client'
import { motion } from 'framer-motion'

const DAYS = [
    { id: 1, date: 'Feb 7', label: 'Rose Day' },
    { id: 2, date: 'Feb 8', label: 'Propose Day' },
    { id: 3, date: 'Feb 9', label: 'Chocolate Day' },
    { id: 4, date: 'Feb 10', label: 'Teddy Day' },
    { id: 5, date: 'Feb 11', label: 'Promise Day' },
    { id: 6, date: 'Feb 12', label: 'Hug Day' },
    { id: 7, date: 'Feb 13', label: 'Kiss Day' },
    { id: 8, date: 'Feb 14', label: 'Valentine\'s Day' },
]

export default function WeekNavigation({ currentDay, setDay }) {
    // Logic to determine unlocked days
    // For unlocking all days for testing/demo, uncomment the line below:
    // const maxUnlocked = 8 

    // Real logic:
    const today = new Date()
    const currentMonth = today.getMonth() // 1 is Feb
    const currentDate = today.getDate()

    let maxUnlocked = 1
    if (currentMonth === 1) { // February
        if (currentDate >= 7 && currentDate <= 14) {
            maxUnlocked = currentDate - 6
        } else if (currentDate > 14) {
            maxUnlocked = 8
        }
    } else if (currentMonth > 1) {
        maxUnlocked = 8
    }

    // For development demo, let's unlock all so the user can see it
    //maxUnlocked = 8 // COMMENTED OUT FOR PRODUCTION

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 100,
            padding: '1rem',
            display: 'flex',
            justifyContent: 'center',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
            overflowX: 'auto'
        }}>
            <div style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem' }}>
                {DAYS.map((d) => {
                    const isLocked = d.id > maxUnlocked
                    const isActive = currentDay === d.id

                    return (
                        <motion.button
                            key={d.id}
                            onClick={() => !isLocked && setDay(d.id)}
                            whileHover={{ scale: isLocked ? 1 : 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                border: isActive ? '1px solid #ffd700' : '1px solid rgba(255,255,255,0.2)',
                                background: isActive ? 'rgba(217, 4, 41, 0.8)' : 'rgba(0,0,0,0.5)',
                                color: isLocked ? '#555' : 'white',
                                cursor: isLocked ? 'not-allowed' : 'pointer',
                                backdropFilter: 'blur(5px)',
                                minWidth: '100px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{d.date}</span>
                            <span style={{ fontWeight: 'bold' }}>{isLocked ? '🔒' : d.label.split(' ')[0]}</span>
                        </motion.button>
                    )
                })}
            </div>
        </div>
    )
}
