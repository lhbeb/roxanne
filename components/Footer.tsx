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
                        <a
                            href="mailto:roxanneamelia73@outlook.com"
                            className="inline-flex items-center gap-2 mt-3 text-sm text-gray-400 hover:text-[#00ab6b] transition-colors"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            roxanneamelia73@outlook.com
                        </a>
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
                    <div className="flex items-center gap-4">
                        <a
                            href="https://www.linkedin.com/in/roxanne-joiner-873368118/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="text-gray-500 hover:text-[#0a66c2] transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            Made with <Heart size={12} className="text-[#00ab6b]" /> for creators
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
