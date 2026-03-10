'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Menu, X, Music2, Layers, ShoppingBag, Search } from 'lucide-react'

function NavbarContent() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [query, setQuery] = useState('')
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Sync input with URL on mount
    useEffect(() => {
        setQuery(searchParams.get('q') ?? '')
    }, [searchParams])

    function handleSearch(value: string) {
        setQuery(value)
        const params = new URLSearchParams(searchParams.toString())
        if (value) {
            params.set('q', value)
        } else {
            params.delete('q')
        }
        const target = pathname === '/' ? `/?${params}` : `/?${params}`
        router.replace(target, { scroll: false })
    }

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#191c26]/90 border-b border-[#2f3441]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group flex-shrink-0">
                        <Image src="/logo.svg" alt="Roxanne" width={120} height={36} className="h-9 w-auto group-hover:opacity-80 transition-opacity" />
                    </Link>

                    {/* Search bar - center */}
                    <div className="hidden md:flex flex-1 max-w-sm mx-auto">
                        <div className="relative w-full">
                            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                            <input
                                id="navbar-search"
                                type="search"
                                placeholder="Search tracks..."
                                value={query}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full bg-[#232733] border border-[#2f3441] hover:border-[#3a4050] focus:border-[#00ab6b] rounded-full pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-1.5 font-medium group/link">
                            <Music2 size={15} className="text-gray-400 shrink-0" />
                            <span className="text-sm text-gray-300 group-hover/link:text-white transition-colors">Browse</span>
                        </Link>
                        <Link href="/collections" className="flex items-center gap-1.5 font-medium group/link">
                            <Layers size={15} className="text-gray-400 shrink-0" />
                            <span className="text-sm text-gray-300 group-hover/link:text-white transition-colors">Collections</span>
                        </Link>
                        <a
                            href="https://buymeacoffee.com/roxanneamelia/extras"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 font-medium group/link"
                        >
                            <ShoppingBag size={15} className="text-gray-400 shrink-0" />
                            <span className="text-sm text-gray-300 group-hover/link:text-white transition-colors">Shop</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/roxanne-joiner-873368118/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="flex items-center text-gray-400 hover:text-[#0a66c2] transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <a
                            href="https://buymeacoffee.com/roxanneamelia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center hover:opacity-80 transition-opacity"
                            aria-label="Buy Me a Coffee"
                        >
                            <Image src="/BMC1.png" alt="Buy Me a Coffee" width={130} height={36} className="h-9 w-auto" />
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#232733] transition-colors"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden border-t border-[#2f3441] bg-[#191c26]">
                    <div className="px-4 py-3 flex flex-col gap-3">
                        <Link href="/" className="flex items-center gap-2 py-2 group/link" onClick={() => setMenuOpen(false)}>
                            <Music2 size={15} className="text-[#00ab6b] shrink-0" />
                            <span className="text-sm text-gray-300 group-hover/link:text-white transition-colors">Browse</span>
                        </Link>
                        <Link href="/collections" className="flex items-center gap-2 py-2 group/link" onClick={() => setMenuOpen(false)}>
                            <Layers size={15} className="text-[#00ab6b] shrink-0" />
                            <span className="text-sm text-gray-300 group-hover/link:text-white transition-colors">Collections</span>
                        </Link>
                        <a
                            href="https://buymeacoffee.com/roxanneamelia/extras"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 py-2 group/link"
                            onClick={() => setMenuOpen(false)}
                        >
                            <ShoppingBag size={15} className="text-[#00ab6b] shrink-0" />
                            <span className="text-sm text-gray-300 group-hover/link:text-white transition-colors">Shop</span>
                        </a>
                        <a
                            href="https://buymeacoffee.com/roxanneamelia"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMenuOpen(false)}
                        >
                            <Image src="/BMC1.png" alt="Buy Me a Coffee" width={120} height={34} className="h-8 w-auto" />
                        </a>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default function Navbar() {
    return (
        <Suspense fallback={<div className="h-16 bg-[#191c26] border-b border-[#2f3441]" />}>
            <NavbarContent />
        </Suspense>
    )
}
