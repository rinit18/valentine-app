'use client'
import { motion } from 'framer-motion'

export default function LoveLetter() {
    return (
        <section style={{ padding: '6rem 2rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass"
                style={{ maxWidth: '800px', width: '100%', padding: '4rem', borderRadius: '2rem', textAlign: 'left', lineHeight: '1.8' }}
            >
                <h2 style={{ fontSize: '3rem', marginBottom: '2rem', fontFamily: 'var(--font-playfair)', color: 'var(--primary)' }}>My Dear Tuntuni,</h2>
                <p style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: '#eee' }}>
                    From the moment I met you, my world has been brighter. You are the joy in my days and the peace in my nights.
                </p>
                <p style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: '#eee' }}>
                    Every moment with you is a treasure I hold close to my heart. Thank you for being you, and for choosing me.
                </p>
                <p style={{ fontSize: '1.3rem', marginBottom: '3rem', color: '#eee' }}>
                    I love you more than words can say.
                </p>
                <p style={{ fontSize: '1.5rem', textAlign: 'right', fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>
                    Forever Yours,<br />
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>[Rinit Bhowmick]</span>
                </p>
            </motion.div>
        </section>
    )
}
