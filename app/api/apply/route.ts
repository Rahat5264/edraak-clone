import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // require fileData (base64) and fileName
    if (!body?.fileData || !body?.fileName) {
      return NextResponse.json({ ok: false, error: 'CV (file) is required' }, { status: 400 })
    }
    const dataPath = path.join(process.cwd(), 'data', 'inquiries.json')
    let arr = []
    try {
      arr = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
      if (!Array.isArray(arr)) arr = []
    } catch (e) {
      arr = []
    }
    // save uploaded file to public/uploads and store fileUrl instead of base64
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
    const safeName = `${Date.now()}-${body.fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`
    const filePath = path.join(uploadsDir, safeName)
    const buffer = Buffer.from(body.fileData, 'base64')
    fs.writeFileSync(filePath, buffer)
    const entry = { ...body, fileUrl: `/uploads/${safeName}`, createdAt: new Date().toISOString() }
    // remove raw fileData from stored entry
    delete entry.fileData
    delete entry.fileName
    delete entry.fileType
    arr.push(entry)
    fs.writeFileSync(dataPath, JSON.stringify(arr, null, 2))
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
