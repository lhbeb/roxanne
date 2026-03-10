import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="border-t border-[#2f3441] bg-[#191c26] mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center mb-4">
                            <Image src="/logo.svg" alt="Roxanne" width={120} height={36} className="h-9 w-auto" />
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                            A free audio &amp; media library sharing high quality resources with creators worldwide.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <ul className="space-y-2">
                                {[
                                    { label: 'Browse Audio', href: '/' },
                                    { label: 'Collections', href: '/collections' },
                                    { label: 'About', href: '/about' },
                                    { label: 'Admin Panel', href: '/admin' },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm text-gray-400 hover:text-[#00ab6b] transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link href="/privacy" className="hover:text-[#00ab6b] transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="hover:text-[#00ab6b] transition-colors">Terms of Service</Link></li>
                                <li><Link href="/license" className="hover:text-[#00ab6b] transition-colors">License Agreement</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-[#2f3441] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-gray-500">© 2024 Roxanne. All rights reserved.</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                        Made with <Heart size={12} className="text-[#00ab6b]" /> for creators
                    </p>
                </div>
            </div>
        </footer>
    )
}
