import HeroSection from '../components/HeroSection';
import StoriesSection from '../components/StoriesSection';
import EventsSection from '../components/EventsSection';
import CommunitySection from '../components/CommunitySection';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <HeroSection />

      {/* Meitei Mayek divider */}
      <div className="max-w-6xl mx-auto px-5 py-2">
        <div className="meitei-rule text-ink">
          <div className="meitei-rule-diamond" />
        </div>
      </div>

      <StoriesSection />

      <EventsSection />

      <CommunitySection />

      {/* Join strip */}
      <section className="bg-gradient-to-r from-[#F0EAF8] via-[#FAF9FC] to-[#F3EDFB] border-t border-parchment-dark">
        <div className="max-w-4xl mx-auto px-5 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-soft text-lavender text-xs font-bold uppercase tracking-wider mb-4 border border-lavender/25 shadow-sm">
            <span>✦</span> Join MSAP Alumni Network
          </div>
          <h2 className="font-display text-ink text-3xl md:text-4xl mb-3 font-semibold">
            Your community is waiting
          </h2>
          <p className="text-stone text-base mb-8 max-w-md mx-auto leading-relaxed">
            Register once. Get access to the alumni directory, event invites, and every Manipuri who studied in Pune.
          </p>
          <Link
            to="/register"
            className="inline-block bg-lavender hover:bg-lavender-dark text-white font-bold px-9 py-4 rounded-xl shadow-md transition-all text-base hover:-translate-y-0.5"
          >
            Register for Verification →
          </Link>
        </div>
      </section>
    </div>
  );
}
