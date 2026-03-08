import HeroSection from '@/components/HeroSection'
import AudioGridPlaceholder from '@/components/AudioGridPlaceholder'
import SupportSection from '@/components/SupportSection'
import SocialLinks from '@/components/SocialLinks'

export default function HomePage() {
    return (
        <div>
            {/* Profile Hero (cover + avatar + follow) */}
            <HeroSection />

            {/* Latest 4 Audio Tracks */}
            <AudioGridPlaceholder
                limit={4}
                title="Latest Tracks"
                subtitle="Freshly added audio for your projects"
            />

            {/* Support / Donation */}
            <SupportSection />

            {/* Divider */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 mt-8">
                <div className="border-t border-[#2f3441]" />
            </div>

            {/* Full Audio Library */}
            <AudioGridPlaceholder
                title="Full Audio Library"
                subtitle="Download premium, royalty-free audio tracks for your creative projects."
            />

            {/* Email Subscription Links */}
            <SocialLinks />
        </div>
    )
}
