import Image from 'next/image'
import Link from 'next/link'
import { Music2, Heart, Download, Users, Sparkles, Globe } from 'lucide-react'

export const metadata = {
    title: 'About – Roxanne Joiner',
    description: 'Learn about Roxanne Joiner, an independent audio creator sharing high-quality, royalty-free sounds with creators worldwide.',
}

const stats = [
    { value: '23+', label: 'Audio Tracks' },
    { value: '100%', label: 'Royalty Free' },
    { value: 'Free', label: 'Always & Forever' },
    { value: '∞', label: 'Downloads' },
]

const values = [
    {
        icon: Music2,
        title: 'Studio-Grade Quality',
        desc: 'Every sound is professionally engineered, processed, and tested to work seamlessly in real-world productions.',
    },
    {
        icon: Heart,
        title: 'Made for Creators',
        desc: 'This library was built by a creator, for creators. No subscriptions, no royalties, no gatekeeping.',
    },
    {
        icon: Globe,
        title: 'Free for Everyone',
        desc: 'High-quality audio should not be locked behind paywalls. Every free track here is yours to keep and use.',
    },
    {
        icon: Sparkles,
        title: 'Constantly Growing',
        desc: 'New sounds are added regularly across genres, styles, and moods to serve an ever-expanding creative community.',
    },
]

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#191c26] text-white">

            {/* Hero */}
            <section className="relative overflow-hidden border-b border-[#2f3441]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e22]/60 via-[#191c26] to-[#1c1a2e]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00ab6b]/6 blur-[130px] rounded-full pointer-events-none" />

                <div className="relative max-w-5xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-12">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-[#00ab6b]/30 shadow-2xl shadow-[#00ab6b]/10">
                            <Image src="/avatar.png" alt="Roxanne Joiner" fill className="object-cover" />
                        </div>
                    </div>

                    {/* Text */}
                    <div>
                        <div className="inline-flex items-center gap-2 bg-[#00ab6b]/10 border border-[#00ab6b]/30 text-[#00ab6b] text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
                            Independent Audio Creator
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                            Hi, I&apos;m Roxanne Joiner
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                            I&apos;m an independent audio creator dedicated to engineering high-quality, royalty-free sounds and sharing them freely with creators around the world.
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {stats.map(({ value, label }) => (
                        <div key={label} className="bg-[#232733] border border-[#2f3441] rounded-2xl p-6 text-center">
                            <p className="text-3xl font-bold text-[#00ab6b] mb-1">{value}</p>
                            <p className="text-sm text-gray-400">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Mission */}
                <div className="flex flex-col md:flex-row gap-10 items-start">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-4">The Mission</h2>
                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p>
                                I started this library because I was tired of searching for decent audio assets only to hit paywalls, licensing restrictions, or poor quality files. Creators deserve better.
                            </p>
                            <p>
                                Every track uploaded here is personally engineered, mixed, and quality-checked. Whether you are building a film, a YouTube video, a game, or a podcast, I want you to have access to sounds that actually sound professional.
                            </p>
                            <p>
                                The library is free. Always has been. Always will be. If you love what I do, the best way to support is through my <Link href="https://buymeacoffee.com/roxanneamelia" target="_blank" rel="noopener noreferrer" className="text-[#00ab6b] hover:underline">BuyMeACoffee</Link> page or by purchasing the Premium Sound Pack.
                            </p>
                        </div>
                    </div>

                    {/* Story card */}
                    <div className="w-full md:w-72 flex-shrink-0 bg-[#232733] border border-[#2f3441] rounded-2xl p-6">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 bg-[#191c26]">
                            <Image src="/story.png" alt="Roxanne Joiner" fill className="object-cover opacity-80" />
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Audio creator, sound engineer, and music maker sharing resources with the global creator community.
                        </p>
                    </div>
                </div>

                {/* Values grid */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-8">What This Library Stands For</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {values.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="bg-[#232733] border border-[#2f3441] rounded-2xl p-6 flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#00ab6b]/10 border border-[#00ab6b]/20 flex items-center justify-center flex-shrink-0">
                                    <Icon size={18} className="text-[#00ab6b]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1">{title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-[#1a2e22] to-[#1c1a2e] border border-[#00ab6b]/20 rounded-3xl p-10 text-center">
                    <h2 className="text-2xl font-bold text-white mb-3">Start Exploring the Library</h2>
                    <p className="text-gray-400 mb-7 max-w-md mx-auto">
                        Browse the full collection of royalty-free audio tracks, download what you need, and create without limits.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-[#00ab6b] hover:bg-[#009e63] text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#00ab6b]/20"
                        >
                            <Download size={16} />
                            Browse Free Audio
                        </Link>
                        <Link
                            href="https://buymeacoffee.com/roxanneamelia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#FFDD00] hover:bg-[#f0cf00] text-[#0D0C22] font-semibold px-6 py-3 rounded-xl transition-all"
                        >
                            <Heart size={16} />
                            Support on BuyMeACoffee
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
