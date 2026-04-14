import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const dataPath = path.join(process.cwd(), 'data', 'inquiries.json')
    let arr = []
    try {
      arr = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
      if (!Array.isArray(arr)) arr = []
    } catch (e) {
      arr = []
    }
    const entry = { ...body, createdAt: new Date().toISOString() }
    arr.push(entry)
    fs.writeFileSync(dataPath, JSON.stringify(arr, null, 2))
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
