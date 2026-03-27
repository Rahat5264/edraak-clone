import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const file = path.join(process.cwd(), 'data', 'content.json')
    const raw = fs.readFileSync(file, 'utf8')
    const content = JSON.parse(raw)
    return NextResponse.json(content)
  } catch (e) {
    return NextResponse.json({ error: 'Unable to read content' }, { status: 500 })
  }
}
