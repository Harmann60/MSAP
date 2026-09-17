import { Link } from 'react-router-dom';

const EVENTS = [
  { id: 1, date: 'Aug 15, 2026', title: 'Annual Alumni Meet', location: 'Pune', category: 'Community' },
  { id: 2, date: 'Sep 10, 2026', title: 'Career Networking Night', location: 'Virtual', category: 'Career' },
  { id: 3, date: 'Mar 3, 2026', title: 'Yaoshang Cultural Evening', location: 'Imphal', category: 'Cultural' },
  { id: 4, date: 'Jul 20, 2026', title: 'New Alumni Orientation', location: 'Online', category: 'Onboarding' },
];

export default function EventsSection() {
  return (
    <section className="bg-gradient-to-b from-[#FAF9FC] to-[#F5F1FA] border-y border-parchment-dark py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-lavender block mb-1">
              Upcoming Gatherings
            </span>
            <h2 className="font-display text-ink text-2xl md:text-3xl font-semibold">
              Events & Reunions
            </h2>
            <p className="text-muted text-sm mt-1">
              Celebrations, networking nights, and cultural gatherings.
            </p>
          </div>
          <Link
            to="/events"
            className="text-lavender text-sm font-semibold hover:underline inline-flex items-center gap-1 group"
          >
            Explore all events
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EVENTS.map((event) => (
            <Link
              key={event.id}
              to="/events"
              className="group bg-white border-2 border-parchment-dark hover:border-lavender p-6 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-lavender bg-lavender-soft px-3 py-1 rounded-full border border-lavender/30">
                    {event.category}
                  </span>
                  <span className="text-muted text-xs font-semibold">{event.location}</span>
                </div>
                <h3 className="font-display text-ink text-lg font-bold group-hover:text-lavender transition-colors mb-2 leading-snug">
                  {event.title}
                </h3>
              </div>
              <div className="pt-4 mt-4 border-t border-parchment-dark text-xs font-bold text-stone flex items-center justify-between">
                <span>{event.date}</span>
                <span className="text-lavender group-hover:translate-x-1.5 transition-transform text-sm">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
