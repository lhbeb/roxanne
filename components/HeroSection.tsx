'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Users, X, Mail, ArrowRight, CheckCircle2, Music2, Download } from 'lucide-react'

export default function ProfileHero() {
    const [showModal, setShowModal] = useState(false)
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [following, setFollowing] = useState(false)

    function handleFollow() {
        if (following) {
            setFollowing(false)
            return
        }
        setShowModal(true)
    }

    function handleSubscribe(e: React.FormEvent) {
        e.preventDefault()
        if (!email) return
        setSubmitted(true)
        setFollowing(true)

        // Notify via Telegram
        fetch('/api/notify-follow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                pageUrl: window.location.href,
                userAgent: navigator.userAgent,
            }),
        }).catch(() => { })

        setTimeout(() => {
            setShowModal(false)
            setSubmitted(false)
            setEmail('')
        }, 2200)
    }

    return (
        <>
            {/* ── Profile Section ── */}
            <section className="w-full mb-0">

                {/* Cover Photo */}
                <div className="relative w-full h-52 md:h-[35vh] overflow-hidden">
                    <Image
                        src="/zantit.png"
                        alt="Profile cover"
                        fill
                        sizes="100vw"
                        quality={100}
                        className="object-cover object-center"
                        priority
                    />
                    {/* subtle dark overlay at bottom so avatar blends */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#191c26]/80" />
                </div>

                {/* Profile bar */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative flex flex-col sm:flex-row sm:items-end gap-4 pb-5 -mt-14 sm:-mt-16">

                        {/* Avatar - overlaps cover */}
                        <div className="relative flex-shrink-0 self-start">
                            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-[#191c26] shadow-2xl shadow-black/50">
                                <Image
                                    src="/avatarpng.png"
                                    alt="Roxanne Joiner"
                                    width={128}
                                    height={128}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            {/* online dot */}
                            <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-[#00ab6b] border-2 border-[#191c26]" />
                        </div>

                        {/* Name + meta */}
                        <div className="flex-1 min-w-0 pt-2 sm:pt-0 sm:pb-1">
                            <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                    Roxanne Joiner
                                </h1>
                                <span className="inline-flex items-center gap-1 bg-[#00ab6b]/15 border border-[#00ab6b]/40 text-[#00ab6b] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                                    <Music2 size={10} /> Audio Engineer & Artist
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm mb-2">@roxannejoiner · Audio Engineer & Artist · Free audio · Professional services available</p>
                            <div className="flex items-center gap-1.5 text-sm">
                                <Users size={14} className="text-[#00ab6b]" />
                                <span className="font-bold text-white">15,682</span>
                                <span className="text-gray-500">followers</span>
                            </div>
                        </div>

                        {/* Stats + Follow - right side */}
                        <div className="flex items-center gap-3 sm:pb-1 flex-shrink-0">
                            {/* Quick stats */}
                            <div className="hidden md:flex items-center gap-4 mr-2">
                                {[
                                    { label: 'Tracks', value: '1.2K' },
                                    { label: 'Downloads', value: '50K' },
                                ].map(s => (
                                    <div key={s.label} className="text-center">
                                        <div className="text-base font-bold text-white">{s.value}</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wide">{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Follow button */}
                            <button
                                id="follow-btn"
                                onClick={handleFollow}
                                className={`inline-flex items-center gap-2 font-semibold px-6 py-2.5 rounded-xl text-sm transition-all duration-200 ${following
                                    ? 'bg-[#232733] border border-[#00ab6b]/60 text-[#00ab6b]'
                                    : 'bg-[#00ab6b] hover:bg-[#009e63] text-white shadow-lg shadow-[#00ab6b]/25 hover:shadow-[#00ab6b]/40 hover:scale-105'
                                    }`}
                            >
                                {following ? (
                                    <><CheckCircle2 size={15} /> Following</>
                                ) : (
                                    <>Follow</>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Thin divider */}
                    <div className="border-t border-[#2f3441]" />
                </div>
            </section>

            {/* ── Quick hero text strip ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                    <div>
                        <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
                            Audio engineer & artist sharing high-quality sounds freely for creators.
                            I also offer professional audio production services from mixing and mastering to custom sound design.
                        </p>
                    </div>
                    <div className="flex gap-3 flex-shrink-0 ml-auto">
                        <a
                            href="#audio-grid"
                            className="inline-flex items-center gap-2 bg-[#00ab6b] hover:bg-[#009e63] text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-[#00ab6b]/20 hover:scale-105"
                        >
                            Browse Audio <ArrowRight size={15} />
                        </a>
                        <a
                            href="#support"
                            className="inline-flex items-center gap-2 bg-[#232733] hover:bg-[#2a2f3d] border border-[#2f3441] text-gray-300 hover:text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 text-sm"
                        >
                            <Download size={15} className="text-[#00ab6b]" /> Free Downloads
                        </a>
                    </div>
                </div>
            </div>

            {/* ── Newsletter Modal ── */}
            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowModal(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                    {/* Modal card */}
                    <div
                        className="relative z-10 bg-[#232733] border border-[#2f3441] rounded-3xl p-8 w-full max-w-md shadow-2xl shadow-black/50 animate-fade-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#191c26] flex items-center justify-center text-gray-500 hover:text-white transition-colors"
                            aria-label="Close"
                        >
                            <X size={15} />
                        </button>

                        {submitted ? (
                            /* Success state */
                            <div className="text-center py-6">
                                <div className="w-16 h-16 rounded-full bg-[#00ab6b]/15 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 size={32} className="text-[#00ab6b]" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">You&apos;re in! 🎵</h3>
                                <p className="text-gray-400 text-sm">Welcome to the community. Watch your inbox for new drops.</p>
                            </div>
                        ) : (
                            <>
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#00ab6b]/50 flex-shrink-0">
                                        <Image src="/avatarpng.png" alt="Roxanne Joiner" width={48} height={48} className="object-cover w-full h-full" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white text-sm">Roxanne Joiner</div>
                                        <div className="text-[11px] text-[#00ab6b]">invites you to follow</div>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <div className="inline-flex items-center gap-1.5 bg-[#00ab6b]/10 border border-[#00ab6b]/30 rounded-full px-3 py-1 mb-3">
                                        <Mail size={12} className="text-[#00ab6b]" />
                                        <span className="text-xs font-semibold text-[#00ab6b]">Newsletter</span>
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-white mb-2 leading-snug">
                                        Get new audio drops<br />every week 🎧
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        Enter your email address, become a follower and get fresh audio drops straight to your inbox, absolutely free.
                                    </p>
                                </div>

                                <form onSubmit={handleSubscribe} className="mt-5 space-y-3">
                                    <div className="relative">
                                        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                                        <input
                                            id="newsletter-email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className="w-full bg-[#191c26] border border-[#2f3441] focus:border-[#00ab6b] rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 outline-none transition-colors text-sm"
                                        />
                                    </div>
                                    <button
                                        id="newsletter-submit"
                                        type="submit"
                                        className="w-full bg-[#00ab6b] hover:bg-[#009e63] text-white font-bold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#00ab6b]/25"
                                    >
                                        Become a Follower
                                        <ArrowRight size={16} />
                                    </button>
                                    <p className="text-[11px] text-gray-600 text-center">No spam, unsubscribe anytime.</p>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
