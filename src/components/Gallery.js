'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Gallery() {
    const [images, setImages] = useState([])

    useEffect(() => {
        fetch('/api/memories')
            .then(res => res.json())
            .then(data => setImages(data.images))
            .catch(err => console.error("Failed to load images", err))
    }, [])

    return (
        <section style={{ padding: '4rem 0', width: '100%' }}>
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '3rem', fontFamily: 'var(--font-playfair)', color: 'var(--secondary)' }}
            >
                Our Beautiful Moments
            </motion.h2>

            {images.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p style={{ fontSize: '1.5rem', color: '#ccc', marginBottom: '1rem' }}>
                        No photos found yet!
                    </p>
                    <p style={{ fontSize: '1.2rem', color: '#888' }}>
                        Drop your photos into the <br />
                        <code style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '5px', color: 'var(--primary)' }}>
                            public/memories
                        </code> <br />
                        folder to see them here.
                    </p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', padding: '0 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                    {images.map((img, i) => (
                        <motion.div
                            key={img}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                            className="glass"
                            style={{
                                height: '400px',
                                borderRadius: '1rem',
                                overflow: 'hidden',
                                position: 'relative',
                                cursor: 'pointer',
                                border: '1px solid rgba(255,255,255,0.2)'
                            }}
                        >
                            {/* 
                  Using unoptimized={true} because local file serving for dynamic user content 
                  can sometimes be tricky with Next.js default loader depending on configuration. 
                  However, "grainy" suggests low-res rendering. 
                  Let's try standard optimizing first. If it fails to load, we switch.
                  Actually, for the "grainy" complaint on 12MB images, it means they are likely being downsampled poorly.
                  Next.js Image usually handles this well.
               */}
                            <Image
                                src={`/memories/${img}`}
                                alt="Memory"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{ objectFit: 'cover' }}
                                className="memory-img"
                            />
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    )
}
