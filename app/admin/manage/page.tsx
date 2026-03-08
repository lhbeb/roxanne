'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Trash2, ListMusic, Loader2, Pencil, Music } from 'lucide-react'
import { supabase, Track } from '@/lib/supabase'

export default function ManagePage() {
    const [tracks, setTracks] = useState<Track[]>([])
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    useEffect(() => {
        fetchTracks()
    }, [])

    async function fetchTracks() {
        setLoading(true)
        const { data, error } = await supabase.from('tracks').select('*').order('created_at', { ascending: false })
        if (!error && data) setTracks(data)
        setLoading(false)
    }

    async function handleDelete(id: string, fileUrl: string, thumbnailUrl: string | null) {
        if (!confirm('Are you sure you want to delete this track? This cannot be undone.')) return
        try {
            setDeletingId(id)
            const pathsToDelete: string[] = []
            const audioPart = fileUrl.split('/audio/')
            if (audioPart.length > 1) pathsToDelete.push(audioPart[1])
            if (thumbnailUrl) {
                const thumbPart = thumbnailUrl.split('/audio/')
                if (thumbPart.length > 1) pathsToDelete.push(thumbPart[1])
            }
            if (pathsToDelete.length > 0) {
                await supabase.storage.from('audio').remove(pathsToDelete)
            }
            await supabase.from('tracks').delete().eq('id', id)
            setTracks(prev => prev.filter(t => t.id !== id))
        } catch (err) {
            console.error('Failed to delete track:', err)
            alert('Failed to delete track.')
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header */}
            <div className="mb-8">
                <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#00ab6b] transition-colors mb-4">
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00ab6b]/15 flex items-center justify-center border border-[#00ab6b]/30">
                        <ListMusic size={18} className="text-[#00ab6b]" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Manage Tracks</h1>
                        <p className="text-gray-500 text-sm mt-0.5">{tracks.length} track{tracks.length !== 1 ? 's' : ''} in library</p>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="bg-[#232733] border border-[#2f3441] rounded-2xl overflow-hidden shadow-2xl">
                {loading ? (
                    <div className="py-20 flex flex-col justify-center items-center text-gray-500">
                        <Loader2 className="animate-spin mb-4" size={30} />
                        <p>Loading tracks...</p>
                    </div>
                ) : tracks.length === 0 ? (
                    <div className="py-20 text-center text-gray-500">
                        <ListMusic className="mx-auto mb-4 opacity-50" size={40} />
                        <p className="text-lg font-medium text-gray-300">No tracks found</p>
                        <p className="mb-6 mt-1">You haven&apos;t uploaded any audio tracks yet.</p>
                        <Link
                            href="/admin/upload"
                            className="inline-flex items-center justify-center bg-[#00ab6b] hover:bg-[#009e63] text-white font-semibold px-6 py-2.5 rounded-xl transition-all"
                        >
                            Upload First Track
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-[#2f3441]">
                        {tracks.map((track) => (
                            <div key={track.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#1f232e] transition-colors">
                                {/* Thumbnail */}
                                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#191c26] border border-[#2f3441] flex-shrink-0">
                                    {track.thumbnail_url ? (
                                        <Image
                                            src={track.thumbnail_url}
                                            alt={track.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Music size={20} className="text-gray-600" />
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-white truncate">{track.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        {track.category && (
                                            <span className="bg-gray-500/15 text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                                                {track.category}
                                            </span>
                                        )}
                                        {track.duration && (
                                            <span className="text-xs text-gray-500 font-mono">{track.duration}</span>
                                        )}
                                        <span className="text-xs text-gray-600">
                                            {new Date(track.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <Link
                                        href={`/admin/edit/${track.id}`}
                                        className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white hover:bg-[#2f3441] px-3 py-1.5 rounded-lg transition-colors text-sm"
                                        title="Edit Track"
                                    >
                                        <Pencil size={14} />
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(track.id, track.file_url, track.thumbnail_url)}
                                        disabled={deletingId === track.id}
                                        className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors text-sm"
                                        title="Delete Track"
                                    >
                                        {deletingId === track.id ? (
                                            <Loader2 className="animate-spin" size={14} />
                                        ) : (
                                            <Trash2 size={14} />
                                        )}
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
