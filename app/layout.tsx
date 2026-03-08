import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VisitorNotifier from '@/components/VisitorNotifier'

export const metadata: Metadata = {
    title: 'Roxanne - Free Audio & Media Library',
    description: 'High quality music, sound effects and media resources shared freely for creators.',
    keywords: 'free audio, music library, sound effects, media resources, royalty free',
    icons: {
        icon: '/favicon.png',
    },
    openGraph: {
        title: 'Roxanne - Free Audio & Media Library',
        description: 'High quality music, sound effects and media resources shared freely for creators.',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
            <body className="min-h-screen bg-[#191c26] text-white antialiased">
                <VisitorNotifier />
                <Navbar />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
