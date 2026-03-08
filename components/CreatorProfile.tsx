import { MapPin, Calendar, Users, Download, Eye, Music2, Star } from 'lucide-react'

const stats = [
    { icon: Star, label: 'Likes', value: '12.4K' },
    { icon: Eye, label: 'Views', value: '850K' },
    { icon: Download, label: 'Downloads', value: '50K' },
    { icon: Music2, label: 'Items Published', value: '1,200' },
]

export default function CreatorProfile() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 mb-14">
            <div className="bg-[#232733] border border-[#2f3441] rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00ab6b] to-[#00d47e] flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                            R
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00ab6b] border-2 border-[#232733]" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                            <h2 className="text-xl font-bold text-white">Roxanne Media</h2>
                            <span className="inline-flex items-center gap-1 bg-[#00ab6b]/10 border border-[#00ab6b]/30 text-[#00ab6b] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                ✓ Creator
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-lg mb-3">
                            Sharing high-quality, royalty-free audio and media resources for creators worldwide. All tracks are free to use in your projects.
                        </p>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <MapPin size={12} className="text-[#00ab6b]" />
                                Worldwide
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Calendar size={12} className="text-[#00ab6b]" />
                                Joined Jan 2020
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Users size={12} className="text-[#00ab6b]" />
                                28.5K Followers
                            </span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full sm:w-auto">
                        {stats.map((stat) => (
                            <div key={stat.label} className="bg-[#191c26] border border-[#2f3441] rounded-xl p-3 text-center min-w-[80px]">
                                <stat.icon size={16} className="text-[#00ab6b] mx-auto mb-1.5" />
                                <div className="text-base font-bold text-white">{stat.value}</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-wide">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
