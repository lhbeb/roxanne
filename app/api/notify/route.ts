import { NextRequest, NextResponse } from 'next/server'

const BOT_TOKEN = '8103676783:AAGnnUDAZjYqVUtoaSyuTgdGReWWdVH_yrg'
const CHAT_ID = '-1002806502052'

export async function POST(req: NextRequest) {
    try {
        const { path, referrer, userAgent } = await req.json()

        const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'Unknown'

        const text = [
            '👁 *New Visitor*',
            `📄 Page: \`${path}\``,
            `🌍 IP: \`${ip}\``,
            referrer ? `🔗 Referrer: \`${referrer}\`` : null,
            `🖥 Agent: \`${userAgent?.slice(0, 80) ?? 'Unknown'}\``,
            `⏰ ${new Date().toUTCString()}`,
        ].filter(Boolean).join('\n')

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text,
                parse_mode: 'Markdown',
            }),
        })

        return NextResponse.json({ ok: true })
    } catch {
        return NextResponse.json({ ok: false }, { status: 500 })
    }
}
