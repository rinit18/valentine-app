'use client'
import { useState, useEffect } from 'react'

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        const target = new Date(`Feb 14, ${new Date().getFullYear()} 00:00:00`).getTime()

        const interval = setInterval(() => {
            const now = new Date().getTime()
            const difference = target - now

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                })
            } else {
                clearInterval(interval)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            marginTop: '2rem',
            marginBottom: '2rem'
        }}>
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: 'rgba(0,0,0,0.5)',
                    padding: '1rem',
                    borderRadius: '10px',
                    border: '1px solid #d90429',
                    minWidth: '80px'
                }}>
                    <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffd700' }}>
                        {value < 10 ? `0${value}` : value}
                    </span>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#aaa' }}>
                        {unit}
                    </span>
                </div>
            ))}
        </div>
    )
}
