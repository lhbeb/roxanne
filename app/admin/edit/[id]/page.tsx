'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Save, Loader2, Music, Upload, X } from 'lucide-react'
import { supabase, Track } from '@/lib/supabase'

export default function EditTrackPage() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()
    const thumbInputRef = useRef<HTMLInputElement>(null)

    const [track, setTrack] = useState<Track | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    // Editable fields
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [duration, setDuration] = useState('')

    // New thumbnail
    const [newThumb, setNewThumb] = useState<File | null>(null)
    const [thumbPreview, setThumbPreview] = useState<string | null>(null)

    useEffect(() => {
        async function load() {
            const { data, error } = await supabase.from('tracks').select('*').eq('id', id).single()
            if (error || !data) { setError('Track not found.'); setLoading(false); return }
            setTrack(data)
            setTitle(data.title || '')
            setDescription(data.description || '')
            setCategory(data.category || '')
            setDuration(data.duration || '')
            setLoading(false)
        }
        load()
    }, [id])

    function handleThumbChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return
        setNewThumb(file)
        setThumbPreview(URL.createObjectURL(file))
    }

    function removeNewThumb() {
        setNewThumb(null)
        setThumbPreview(null)
        if (thumbInputRef.current) thumbInputRef.current.value = ''
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault()
        if (!track) return
        setSaving(true)
        setError('')

        try {
            let thumbnailUrl = track.thumbnail_url

            // Upload new thumbnail if selected
            if (newThumb) {
                const ext = newThumb.name.split('.').pop()
                const thumbPath = `thumbnails/${id}-${Date.now()}.${ext}`
                const { error: uploadErr } = await supabase.storage.from('audio').upload(thumbPath, newThumb, { upsert: true })
                if (uploadErr) throw new Error(`Thumbnail upload failed: ${uploadErr.message}`)

                // If old thumbnail existed, delete it
                if (track.thumbnail_url) {
                    const oldPath = track.thumbnail_url.split('/audio/')[1]
                    if (oldPath) await supabase.storage.from('audio').remove([oldPath])
                }

                const { data: { publicUrl } } = supabase.storage.from('audio').getPublicUrl(thumbPath)
                thumbnailUrl = publicUrl
            }

            const { error: updateErr } = await supabase.from('tracks').update({
                title,
                description,
                category,
                duration,
                thumbnail_url: thumbnailUrl,
            }).eq('id', id)

            if (updateErr) throw new Error(updateErr.message)

            setSuccess(true)
            setTimeout(() => router.push('/admin/manage'), 1200)
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'An unknown error occurred.'
            setError(msg)
        } finally {
            setSaving(false)
        }
    }

    const categories = ['Music', 'Beats', 'Sound Effects', 'Ambient', 'Cinematic', 'Lo-Fi', 'Vocals', 'Other']

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center text-gray-400">
            <Loader2 className="animate-spin mr-3" size={24} /> Loading track...
        </div>
    )

    if (!track) return (
        <div className="min-h-screen flex items-center justify-center text-gray-400">
            <p>{error || 'Track not found.'}</p>
        </div>
    )

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header */}
            <div className="mb-8">
                <Link href="/admin/manage" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#00ab6b] transition-colors mb-4">
                    <ArrowLeft size={16} /> Back to Manage Tracks
                </Link>
                <h1 className="text-3xl font-bold text-white">Edit Track</h1>
                <p className="text-gray-500 text-sm mt-1">Update the metadata for this track</p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">

                {/* Thumbnail */}
                <div className="bg-[#232733] border border-[#2f3441] rounded-2xl p-6">
                    <label className="block text-sm font-semibold text-white mb-4">Thumbnail</label>
                    <div className="flex items-start gap-5">
                        {/* Current / preview */}
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#191c26] border border-[#2f3441] flex-shrink-0">
                            {thumbPreview ? (
                                <>
                                    <Image src={thumbPreview} alt="New thumbnail" fill className="object-cover" />
                                    <button type="button" onClick={removeNewThumb}
                                        className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-0.5 hover:bg-red-500 transition-colors">
                                        <X size={10} />
                                    </button>
                                </>
                            ) : track.thumbnail_url ? (
                                <Image src={track.thumbnail_url} alt={track.title} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Music size={28} className="text-gray-600" />
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 mb-3">
                                {track.thumbnail_url ? 'Replace the current thumbnail' : 'No thumbnail yet'} — upload a new one below.
                            </p>
                            <input
                                ref={thumbInputRef}
                                type="file"
                                accept=".webp,.jpg,.jpeg,.png"
                                onChange={handleThumbChange}
                                className="hidden"
                                id="thumb-upload"
                            />
                            <label htmlFor="thumb-upload"
                                className="inline-flex items-center gap-2 cursor-pointer bg-[#191c26] hover:bg-[#2f3441] border border-[#2f3441] hover:border-[#3a4050] text-gray-400 hover:text-white text-sm font-medium px-4 py-2 rounded-xl transition-all">
                                <Upload size={14} /> Choose Image
                            </label>
                            {newThumb && <p className="text-xs text-[#00ab6b] mt-2">{newThumb.name} selected</p>}
                        </div>
                    </div>
                </div>

                {/* Text fields */}
                <div className="bg-[#232733] border border-[#2f3441] rounded-2xl p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-white mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            className="w-full bg-[#191c26] border border-[#2f3441] focus:border-[#00ab6b] rounded-xl px-4 py-3 text-white outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-white mb-2">Description <span className="text-gray-500 font-normal">(optional)</span></label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={3}
                            className="w-full bg-[#191c26] border border-[#2f3441] focus:border-[#00ab6b] rounded-xl px-4 py-3 text-white outline-none transition-colors resize-none"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-white mb-2">Category</label>
                            <select
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                className="w-full bg-[#191c26] border border-[#2f3441] focus:border-[#00ab6b] rounded-xl px-4 py-3 text-white outline-none transition-colors cursor-pointer"
                            >
                                <option value="">No category</option>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-white mb-2">Duration</label>
                            <input
                                type="text"
                                value={duration}
                                onChange={e => setDuration(e.target.value)}
                                placeholder="e.g. 2:45"
                                className="w-full bg-[#191c26] border border-[#2f3441] focus:border-[#00ab6b] rounded-xl px-4 py-3 text-white outline-none transition-colors placeholder-gray-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Audio file notice */}
                <div className="bg-[#191c26] border border-[#2f3441] rounded-xl px-4 py-3 text-xs text-gray-500 flex items-center gap-2">
                    <Music size={13} />
                    The audio file itself cannot be changed here. Delete and re-upload to replace the audio.
                </div>

                {/* Error / Success */}
                {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}
                {success && <p className="text-[#00ab6b] text-sm bg-[#00ab6b]/10 border border-[#00ab6b]/20 rounded-xl px-4 py-3">Saved! Redirecting...</p>}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={saving || success}
                    className="w-full flex items-center justify-center gap-2 bg-[#00ab6b] hover:bg-[#009e63] disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-[#00ab6b]/20"
                >
                    {saving ? <><Loader2 className="animate-spin" size={18} /> Saving...</> : <><Save size={18} /> Save Changes</>}
                </button>
            </form>
        </div>
    )
}
