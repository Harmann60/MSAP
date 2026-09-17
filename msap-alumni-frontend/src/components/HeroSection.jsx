import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-b from-[#F2EDFA] via-[#FAF9FC] to-[#FAF9FC] text-ink overflow-hidden border-b border-parchment-dark/70">
      {/* Ambient background glow layers */}
      <div className="absolute top-[-10%] left-[15%] w-[480px] h-[480px] bg-gradient-to-br from-lavender/15 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-[20%] right-[-5%] w-[420px] h-[420px] bg-gradient-to-bl from-gold/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left copy */}
          <div className="lg:col-span-7 animate-heroIn">
            {/* Golden Jubilee & Heritage Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-lavender/30 text-lavender text-xs font-bold uppercase tracking-wider mb-6 shadow-sm backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lavender opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lavender" />
              </span>
              <span>Est. 1973 &middot; Pune, Maharashtra &middot; 50 Years</span>
            </div>

            <h1 className="font-display text-ink text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.12] mb-6 font-semibold">
              For 50 years, Manipuri students came to Pune.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lavender to-lavender-light italic font-medium">
                This is where we stay connected.
              </span>
            </h1>

            <p className="text-stone text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-normal">
              The Association of MSAP Alumni connects generations of Manipuris who lived, learned, and grew in Pune — from the pioneering 1973 PMSA days to present. Register to reconnect with your batchmates.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/register"
                className="group relative inline-flex items-center gap-2.5 bg-lavender hover:bg-lavender-dark text-white font-bold px-8 py-4 rounded-xl shadow-[0_8px_25px_rgba(88,59,156,0.3)] transition-all text-base hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Register for Verification</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-white/90 hover:bg-white border-2 border-parchment-dark hover:border-lavender text-stone hover:text-ink font-bold px-7 py-4 rounded-xl transition-all text-base hover:-translate-y-0.5 shadow-sm backdrop-blur-md"
              >
                <span>Our Heritage</span>
              </Link>
            </div>

            {/* High-fidelity stats grid */}
            <div className="mt-12 pt-8 border-t border-parchment-dark/80 grid grid-cols-3 gap-4 sm:gap-6 max-w-lg">
              <div className="bg-white/60 backdrop-blur-sm p-3.5 rounded-2xl border border-parchment-dark/60">
                <div className="font-display text-2xl sm:text-3xl font-bold text-ink">50+</div>
                <div className="text-[11px] sm:text-xs text-muted font-bold uppercase tracking-wider mt-0.5">Years Legacy</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-3.5 rounded-2xl border border-parchment-dark/60">
                <div className="font-display text-2xl sm:text-3xl font-bold text-lavender">2,000+</div>
                <div className="text-[11px] sm:text-xs text-muted font-bold uppercase tracking-wider mt-0.5">Alumni Global</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-3.5 rounded-2xl border border-parchment-dark/60">
                <div className="font-display text-2xl sm:text-3xl font-bold text-ink">Annual</div>
                <div className="text-[11px] sm:text-xs text-muted font-bold uppercase tracking-wider mt-0.5">Meets & Events</div>
              </div>
            </div>
          </div>

          {/* Right: Ambient video card */}
          <div className="lg:col-span-5 animate-heroInDelay">
            <div className="relative rounded-3xl p-2 bg-gradient-to-tr from-lavender/30 via-white/80 to-gold/25 shadow-[0_20px_60px_-15px_rgba(88,59,156,0.18)] border border-white">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-ink shadow-inner group">
                <video
                  autoPlay muted loop playsInline preload="auto"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  poster="/hero.png"
                >
                  <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

                {/* Floating badge top right */}
                <div className="absolute top-4 right-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-black/40 backdrop-blur-md text-gold-soft border border-gold/40 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                    Golden Jubilee
                  </span>
                </div>

                {/* Bottom title info */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="text-xs font-bold tracking-wider uppercase drop-shadow-md block">
                      50th Golden Jubilee Reunion
                    </span>
                    <span className="text-[11px] text-white/80 font-medium">Symbiosis Ishanya Auditorium &middot; Pune</span>
                  </div>
                  <span className="text-[11px] bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-full text-white font-semibold">
                    Watch Reel
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
