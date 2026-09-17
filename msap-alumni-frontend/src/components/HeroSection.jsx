import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-b from-[#F2EDFA] via-[#FAF9FC] to-[#FAF9FC] text-ink overflow-hidden border-b border-parchment-dark/60">
      {/* Subtle ambient light gradient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-lavender/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left copy */}
          <div className="lg:col-span-7 animate-heroIn">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lavender-soft border border-lavender/25 text-lavender text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-lavender animate-pulse" />
              Est. 1973 &middot; Pune, Maharashtra
            </div>

            <h1 className="font-display text-ink text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.12] mb-6 font-semibold">
              For 50 years, Manipuri students came to Pune.
              <br />
              <span className="text-lavender italic">This is where we stay connected.</span>
            </h1>

            <p className="text-stone text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              The Association of MSAP Alumni brings together every Manipuri who studied in Pune — from the 1973 PMSA days to today. Register to find your people.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/register"
                className="bg-lavender hover:bg-lavender-dark text-white font-bold px-8 py-4 rounded-xl shadow-md transition-all text-base hover:-translate-y-0.5"
              >
                Register Now →
              </Link>
              <Link
                to="/about"
                className="bg-white border-2 border-parchment-dark hover:border-lavender text-stone hover:text-ink font-bold px-8 py-4 rounded-xl transition-all text-base hover:-translate-y-0.5 shadow-sm"
              >
                Our History
              </Link>
            </div>

            {/* Quick stats strip */}
            <div className="mt-12 pt-8 border-t border-parchment-dark grid grid-cols-3 gap-6 max-w-md">
              <div>
                <div className="font-display text-3xl font-bold text-ink">50+</div>
                <div className="text-xs text-muted font-bold uppercase tracking-wider mt-1">Years of Legacy</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-lavender">2,000+</div>
                <div className="text-xs text-muted font-bold uppercase tracking-wider mt-1">Alumni Worldwide</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-ink">Annual</div>
                <div className="text-xs text-muted font-bold uppercase tracking-wider mt-1">Meets & Events</div>
              </div>
            </div>
          </div>

          {/* Right: Ambient video card */}
          <div className="lg:col-span-5 animate-heroInDelay">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(124,92,252,0.12)] border border-white bg-white p-2.5">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-ink">
                <video
                  autoPlay muted loop playsInline preload="auto"
                  className="w-full h-full object-cover"
                  poster="/hero.png"
                >
                  <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="text-xs font-bold tracking-wider uppercase drop-shadow-md">50th Golden Jubilee</span>
                  <span className="text-[11px] bg-white/25 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white font-semibold">Symbiosis Pune</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
