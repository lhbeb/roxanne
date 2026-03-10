'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Play, Pause, Download, Loader2, Music2, Clock } from 'lucide-react'
import { supabase, Track } from '@/lib/supabase'

function formatTime(sec: number) {
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60).toString().padStart(2, '0')
    return `${m}:${s}`
}

function AudioCard({ track, activeId, onPlay }: { track: Track; activeId: string | null; onPlay: (id: string | null) => void }) {
    const audioRef = useRef<HTMLAudioElement>(null)
    const isPlaying = activeId === track.id
    const [progress, setProgress] = useState(0)
    const [currentTime, setCurrentTime] = useState('0:00')

    useEffect(() => {
        if (!audioRef.current) return
        if (isPlaying) {
            audioRef.current.play().catch(() => { })
        } else {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
            setProgress(0)
            setCurrentTime('0:00')
        }
    }, [isPlaying])

    function handleTimeUpdate() {
        const audio = audioRef.current
        if (!audio || !audio.duration) return
        setProgress((audio.currentTime / audio.duration) * 100)
        setCurrentTime(formatTime(audio.currentTime))
    }

    async function handleDownload(e: React.MouseEvent) {
        e.preventDefault()
        e.stopPropagation()

        try {
            const res = await fetch(track.file_url)
            const blob = await res.blob()
            const blobUrl = window.URL.createObjectURL(blob)

            const a = document.createElement('a')
            a.style.display = 'none'
            a.href = blobUrl
            a.download = `${track.title}.mp3`
            document.body.appendChild(a)
            a.click()

            window.URL.revokeObjectURL(blobUrl)
            document.body.removeChild(a)
        } catch (error) {
            console.error('Download failed:', error)
            window.open(track.file_url, '_blank')
        }
    }

    return (
        <div className={`group bg-[#232733] border rounded-2xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-[#00ab6b]/10 hover:-translate-y-0.5 ${isPlaying ? 'border-[#00ab6b]/60 shadow-lg shadow-[#00ab6b]/15' : 'border-[#2f3441] hover:border-[#00ab6b]/40'}`}>
            <audio
                ref={audioRef}
                src={track.file_url}
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => { setProgress(0); setCurrentTime('0:00'); onPlay(null) }}
            />

            {/* Thumbnail / waveform area */}
            <div className="w-full h-24 bg-[#191c26] rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                {track.thumbnail_url ? (
                    <img src={track.thumbnail_url} alt={track.title} className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isPlaying ? 'opacity-80 scale-105' : 'opacity-50 group-hover:opacity-70 group-hover:scale-105'}`} />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1c1f2e] to-[#191c26]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#232733]/80 to-transparent" />
                <button
                    id={`play-btn-${track.id}`}
                    onClick={() => onPlay(isPlaying ? null : track.id)}
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-110 ${isPlaying ? 'bg-[#00ab6b]' : 'bg-[#00ab6b] hover:bg-[#009e63]'}`}
                >
                    {isPlaying ? <Pause size={16} className="text-white fill-white" /> : <Play size={16} className="text-white fill-white ml-0.5" />}
                </button>
            </div>

            {/* Info */}
            <h3 className={`font-semibold text-sm leading-snug line-clamp-1 mb-1 transition-colors ${isPlaying ? 'text-[#00ab6b]' : 'text-white group-hover:text-[#00ab6b]'}`}>
                {track.title}
            </h3>
            <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold bg-gray-500/15 text-gray-400 px-2 py-0.5 rounded-full uppercase tracking-wide">
                    {track.category || 'Audio'}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500 font-mono">
                    <Clock size={11} />
                    {isPlaying ? currentTime : (track.duration || '0:00')}
                </span>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-[#191c26] rounded-full overflow-hidden mb-3">
                <div className="h-full bg-[#00ab6b] transition-all duration-100" style={{ width: `${progress}%` }} />
            </div>

            {/* Download */}
            <button
                onClick={handleDownload}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-[#191c26] hover:bg-[#00ab6b]/10 border border-[#2f3441] hover:border-[#00ab6b]/50 text-gray-400 hover:text-[#00ab6b] text-xs font-medium py-2 rounded-xl transition-all"
            >
                <Download size={12} />
                Download MP3
            </button>
        </div>
    )
}

function CollectionContent() {
    const { slug } = useParams<{ slug: string }>()
    const [tracks, setTracks] = useState<Track[]>([])
    const [loading, setLoading] = useState(true)
    const [activeId, setActiveId] = useState<string | null>(null)

    const categoryName = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : ''

    useEffect(() => {
        async function fetchTracks() {
            setLoading(true)
            const { data, error } = await supabase
                .from('tracks')
                .select('*')
                .ilike('category', categoryName)
                .order('created_at', { ascending: false })
            if (!error && data) setTracks(data)
            setLoading(false)
        }
        if (categoryName) fetchTracks()
    }, [categoryName])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-10">
                <Link href="/collections" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#00ab6b] transition-colors mb-4">
                    <ArrowLeft size={16} /> Back to Collections
                </Link>
                <div className="flex items-center gap-2 text-[#00ab6b] text-sm font-semibold mb-3 uppercase tracking-wide">
                    <Music2 size={15} />
                    Collection
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">{categoryName}</h1>
                <p className="text-gray-400">
                    {loading ? 'Loading...' : `${tracks.length} track${tracks.length !== 1 ? 's' : ''} in this collection`}
                </p>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="py-20 flex flex-col items-center text-gray-500">
                    <Loader2 className="animate-spin mb-3" size={28} />
                    <p className="text-sm">Loading tracks...</p>
                </div>
            ) : tracks.length === 0 ? (
                <div className="py-20 text-center text-gray-500 border border-[#2f3441] border-dashed rounded-3xl">
                    <Music2 size={40} className="mx-auto mb-4 opacity-40" />
                    <p className="text-lg font-medium text-gray-300">No tracks yet</p>
                    <p className="text-sm mt-1">No tracks found in the <strong>{categoryName}</strong> category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {tracks.map(track => (
                        <AudioCard
                            key={track.id}
                            track={track}
                            activeId={activeId}
                            onPlay={setActiveId}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default function CollectionPage() {
    return (
        <Suspense fallback={
            <div className="py-40 flex flex-col items-center text-gray-500">
                <Loader2 className="animate-spin mb-3" size={28} />
                <p className="text-sm">Loading collection...</p>
            </div>
        }>
            <CollectionContent />
        </Suspense>
    )
}
