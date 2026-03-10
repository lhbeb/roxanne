import Link from 'next/link'
import { CheckCircle2, Mail, Music2, Film, Gamepad2, Mic2, Zap, ArrowLeft } from 'lucide-react'

export const metadata = {
    title: 'Order Confirmed – Roxanne Joiner Premium Sound Pack',
    description: 'Thank you for your purchase. Your premium sound pack is on its way.',
}

export default function ThankYouPage() {
    return (
        <div className="min-h-screen bg-[#191c26] text-white">
            {/* Hero confirmation banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#1a2e22] via-[#191c26] to-[#1c1a2e] border-b border-[#2f3441]">
                {/* Glow blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00ab6b]/8 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute -top-10 right-10 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative max-w-3xl mx-auto px-6 py-20 flex flex-col items-center text-center">
                    {/* Check icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#00ab6b]/15 border-2 border-[#00ab6b]/40 mb-6 shadow-xl shadow-[#00ab6b]/10">
                        <CheckCircle2 size={38} className="text-[#00ab6b]" />
                    </div>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#00ab6b]/10 border border-[#00ab6b]/30 text-[#00ab6b] text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
                        Order Confirmed
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                        Thank you for your purchase!
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto mb-8">
                        Your order has been received. A follow-up email will be sent to you shortly containing your download link and everything included in your pack.
                    </p>

                    {/* Email notice */}
                    <div className="inline-flex items-center gap-3 bg-[#232733] border border-[#2f3441] rounded-2xl px-6 py-4 text-sm text-gray-300">
                        <Mail size={18} className="text-[#00ab6b] flex-shrink-0" />
                        <span>Check your inbox, your pack download will arrive by email within a few minutes.</span>
                    </div>
                </div>
            </div>

            {/* Product detail */}
            <div className="max-w-3xl mx-auto px-6 py-16 space-y-10">

                {/* Description */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">About Your Pack</h2>
                    <p className="text-gray-400 leading-relaxed mb-3">
                        Unlock a high-quality collection of professionally engineered sounds with the <strong className="text-white">Premium Sound Pack by Roxanne Joiner</strong>.
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                        This pack contains a curated library of music elements, sound effects, and audio textures designed for creators who need clean, cinematic, and production-ready sound. Every sound has been carefully engineered and processed to ensure clarity, depth, and usability across a wide range of creative projects.
                    </p>
                </div>

                {/* What you get */}
                <div className="bg-[#232733] border border-[#2f3441] rounded-2xl p-7">
                    <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                        <Music2 size={18} className="text-[#00ab6b]" /> What You Get
                    </h3>
                    <ul className="space-y-3">
                        {[
                            'A premium collection of professional audio assets',
                            'Music elements, cinematic sounds, and sound effects',
                            'Studio-engineered and production-ready files',
                            'Compatible with video editing, music production, and game development',
                        ].map((item) => (
                            <li key={item} className="flex items-start gap-3 text-gray-300 text-sm">
                                <span className="mt-0.5 w-5 h-5 rounded-full bg-[#00ab6b]/15 flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 size={12} className="text-[#00ab6b]" />
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Perfect for */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-5">Perfect For</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                            { icon: Film, label: 'Filmmakers & Video Editors' },
                            { icon: Zap, label: 'YouTubers & Creators' },
                            { icon: Gamepad2, label: 'Game Developers' },
                            { icon: Music2, label: 'Motion Designers' },
                            { icon: Mic2, label: 'Podcast Creators' },
                            { icon: Music2, label: 'Music Producers' },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-3 bg-[#232733] border border-[#2f3441] rounded-xl px-4 py-3">
                                <Icon size={15} className="text-[#00ab6b] flex-shrink-0" />
                                <span className="text-gray-300 text-xs font-medium">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* License */}
                <div className="bg-gradient-to-br from-[#1a2e22] to-[#1e2030] border border-[#00ab6b]/20 rounded-2xl p-7">
                    <h3 className="text-lg font-bold text-white mb-2">License</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">
                        All sounds included in this pack are <strong className="text-white">royalty-free</strong>, meaning you can use them in your projects without paying ongoing royalties.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            'Films and videos',
                            'Games and apps',
                            'Podcasts and streaming content',
                            'Commercial creative projects',
                        ].map((use) => (
                            <div key={use} className="flex items-center gap-2 text-sm text-[#00ab6b]">
                                <span className="text-base">✔</span>
                                <span className="text-gray-300">{use}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Creator */}
                <div className="text-center pb-4">
                    <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">
                        All sounds in this collection were engineered and designed by{' '}
                        <strong className="text-white">Roxanne Joiner</strong>, an independent audio creator dedicated to producing high-quality sound resources for creators around the world.
                    </p>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 mt-8 text-sm text-gray-400 hover:text-[#00ab6b] transition-colors"
                    >
                        <ArrowLeft size={14} />
                        Back to the library
                    </Link>
                </div>
            </div>
        </div>
    )
}
