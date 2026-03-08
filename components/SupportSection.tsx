import Image from 'next/image'
import { Coffee, ShoppingBag } from 'lucide-react'

export default function SupportSection() {
    return (
        <section id="support" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="relative overflow-hidden bg-gradient-to-br from-[#00ab6b]/15 to-[#00ab6b]/5 border border-[#00ab6b]/30 rounded-3xl">
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ab6b]/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#00ab6b]/5 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative flex flex-col lg:flex-row">

                    {/* Photo - left, flush, no border, no shadow, no caption */}
                    <div className="relative w-full lg:w-80 xl:w-96 min-h-[320px] lg:min-h-full flex-shrink-0">
                        <Image
                            src="/story.png"
                            alt="Roxanne Joiner"
                            fill
                            className="object-cover object-center rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none"
                            sizes="(max-width: 1024px) 100vw, 384px"
                            quality={90}
                        />
                    </div>

                    {/* Text side - right */}
                    <div className="flex-1 p-8 sm:p-12">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-[#00ab6b]/10 border border-[#00ab6b]/40 rounded-full px-3 py-1 mb-6">
                            <Coffee size={13} className="text-[#00ab6b]" />
                            <span className="text-xs font-semibold text-[#00ab6b] uppercase tracking-wide">Support My Work</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                            Help Keep This Library{' '}
                            <span className="bg-gradient-to-r from-[#00ab6b] to-[#00d47e] bg-clip-text text-transparent">
                                Free Forever
                            </span>
                        </h2>

                        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
                            <p>
                                I&apos;ve made available over 1000 audio-visual media elements for free through my portfolio.
                                This is something I do as my full-time work and your support in the form of donations helps a lot.
                            </p>
                            <p>
                                You can also support by purchasing nominally priced exclusive audio, video, and graphic elements
                                from my BuyMeACoffee shop, created specifically for supporters who want fresh and exclusive content.
                            </p>
                            <p className="text-white font-medium">
                                I truly appreciate your support and many thanks for helping me continue sharing
                                creative resources with the community.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="#"
                                id="support-buymeacoffee-btn"
                                className="inline-flex items-center justify-center gap-2 bg-[#FFDD00] hover:bg-[#f0cf00] text-[#0D0C22] font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-[#FFDD00]/25 hover:scale-105"
                            >
                                <Coffee size={17} />
                                Support on BuyMeACoffee
                            </a>
                            <a
                                href="https://buymeacoffee.com/roxanneamelia/extras"
                                target="_blank"
                                rel="noopener noreferrer"
                                id="support-shop-btn"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-[#00ab6b]/50 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 text-sm"
                            >
                                <ShoppingBag size={17} />
                                Visit Shop
                            </a>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
