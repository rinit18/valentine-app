import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
    const memoriesDir = path.join(process.cwd(), 'public', 'memories')

    try {
        if (!fs.existsSync(memoriesDir)) {
            fs.mkdirSync(memoriesDir, { recursive: true })
        }

        const files = fs.readdirSync(memoriesDir)
        const images = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))

        return NextResponse.json({ images })
    } catch (error) {
        console.error('Error reading memories directory:', error)
        return NextResponse.json({ images: [] }, { status: 500 })
    }
}
