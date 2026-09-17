import { Link } from 'react-router-dom';

const ACTIONS = [
  { label: 'Find alumni in your city', to: '/community' },
  { label: 'Join a professional network', to: '/community' },
  { label: 'Attend an event', to: '/events' },
  { label: 'Mentor a recent graduate', to: '/community' },
  { label: 'Read community stories', to: '/stories' },
  { label: 'Start a new alumni group', to: '/community' },
];

export default function CommunitySection() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-16 md:py-24">
      <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-center">
        {/* Left: statement card */}
        <div className="md:col-span-5 bg-gradient-to-br from-white to-[#F6F2FC] border-2 border-parchment-dark p-8 rounded-3xl shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-widest text-lavender block mb-2">
            Networking & Chapters
          </span>
          <h2 className="font-display text-ink text-2xl md:text-3xl font-bold mb-4">
            Connect Across Cities & Generations
          </h2>
          <p className="text-stone text-[15px] leading-relaxed mb-6 font-medium">
            MSAP Alumni connects Manipuri graduates from Pune across cities, careers, and decades. Whether you left Pune last year or in 1985, this is your home away from home.
          </p>
          <Link
            to="/community"
            className="inline-flex items-center gap-1.5 text-lavender font-bold text-sm hover:underline group"
          >
            Explore all regional chapters
            <span className="group-hover:translate-x-1.5 transition-transform">→</span>
          </Link>
        </div>

        {/* Right: action cards grid */}
        <div className="md:col-span-7">
          <div className="grid sm:grid-cols-2 gap-4">
            {ACTIONS.map((action, idx) => (
              <Link
                key={idx}
                to={action.to}
                className="flex items-center justify-between p-4 bg-white border-2 border-parchment-dark hover:border-lavender rounded-2xl text-stone hover:text-lavender transition-all group shadow-sm hover:shadow hover:-translate-y-0.5"
              >
                <span className="text-[15px] font-semibold">{action.label}</span>
                <span className="w-7 h-7 rounded-full bg-parchment flex items-center justify-center text-muted group-hover:bg-lavender-soft group-hover:text-lavender transition-colors shrink-0 ml-2">
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
