import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

async function writeInquiries(entry: any) {
  const file = path.join(process.cwd(), 'data', 'inquiries.json')
  try {
    const raw = await fs.readFile(file, 'utf8')
    const arr = Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : []
    arr.push(entry)
    await fs.writeFile(file, JSON.stringify(arr, null, 2), 'utf8')
  } catch (err) {
    // if file doesn't exist or parse failed, create new
    const arr = [entry]
    await fs.mkdir(path.dirname(file), { recursive: true })
    await fs.writeFile(file, JSON.stringify(arr, null, 2), 'utf8')
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { product, name, address, company, message } = body || {}
    if (!product || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const entry = {
      product,
      name,
      address: address || '',
      company: company || '',
      message: message || '',
      createdAt: new Date().toISOString()
    }

    await writeInquiries(entry)

    // Try to send email if nodemailer & SMTP env vars are present
    const toEmail = process.env.EMAIL_TO || 'sales@edraaksystems.com'
    try {
      const nodemailer = await import('nodemailer')
      const host = process.env.SMTP_HOST
      const user = process.env.SMTP_USER
      const pass = process.env.SMTP_PASS
      const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587
      if (host && user && pass) {
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: { user, pass }
        })

        const text = `New product inquiry\n\nProduct: ${entry.product}\nName: ${entry.name}\nCompany: ${entry.company}\nAddress: ${entry.address}\nMessage: ${entry.message}\nDate: ${entry.createdAt}`

        await transporter.sendMail({
          from: user,
          to: toEmail,
          subject: `Product inquiry: ${entry.product}`,
          text
        })
      }
    } catch (err) {
      // nodemailer not installed or send failed — ignore but keep stored
      // eslint-disable-next-line no-console
      console.warn('Email not sent (optional),', err?.message || err)
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error('Inquiry API error', err)
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
