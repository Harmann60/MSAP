import { useState, useEffect } from 'react';
import { fetchEvents } from '../services/dataService';

const DEFAULT_EVENTS = [
  { id: 1, date: 'Aug 15, 2026', time: '10 AM – 6 PM', title: 'Annual Alumni Meet 2026', location: 'Pune, Maharashtra', category: 'Community', description: 'The yearly gathering of all Pune Manipuri alumni. Reconnect, celebrate, and plan the year ahead.' },
  { id: 2, date: 'Sep 10, 2026', time: '7 PM – 9 PM', title: 'Career Networking Night', location: 'Virtual (Zoom)', category: 'Career', description: 'Connect with alumni across industries for mentorship, referrals, and career guidance.' },
  { id: 3, date: 'Mar 3, 2026', time: '5 PM – 10 PM', title: 'Yaoshang Cultural Evening', location: 'Imphal, Manipur', category: 'Cultural', description: 'Celebrate the festival of colors with the community through music, dance, and tradition. Families welcome.' },
  { id: 4, date: 'Jul 20, 2026', time: '6 PM – 7:30 PM', title: 'New Alumni Orientation', location: 'Online', category: 'Onboarding', description: 'A welcome session for recently registered alumni to learn about the association and how to get involved.' },
  { id: 5, date: 'Mar 14, 2026', time: '11 AM – 3 PM', title: 'Holi Celebration', location: 'Pune, Maharashtra', category: 'Cultural', description: 'Join fellow Manipuris in Pune for traditional music, food, and colors.' },
  { id: 6, date: 'Oct 5, 2026', time: '6 PM – 8 PM', title: 'Mentorship Program Kickoff', location: 'Hybrid', category: 'Career', description: 'Launch of the annual mentorship program pairing experienced alumni with recent graduates.' },
];

export default function EventsPage() {
  const [events, setEvents] = useState(DEFAULT_EVENTS);

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item) => ({
            id: item.id,
            date: item.date_display || item.date,
            time: item.time_display || item.time,
            title: item.title,
            location: item.location,
            category: item.category,
            description: item.description,
            isFeatured: item.is_featured,
          }));
          setEvents(mapped);
        }
      })
      .catch((err) => {
        console.warn('Using offline events data:', err.message);
      });
  }, []);

  const featured = events.filter((e) => e.category === 'Community' || e.category === 'Career' || e.isFeatured);
  const rest = events.filter((e) => !featured.includes(e));

  return (
    <div>
      {/* Header */}
      <div className="max-w-6xl mx-auto px-5 pt-16 pb-12 md:pt-24 md:pb-16">
        <h1 className="font-display text-ink text-3xl md:text-4xl mb-2">Events</h1>
        <p className="text-muted text-sm">Gatherings, celebrations, and ways to reconnect.</p>
      </div>

      <div className="max-w-6xl mx-auto px-5 pb-16 md:pb-24">
        {/* Featured */}
        <div className="mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-lavender block mb-4">★ Featured Events</span>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((event) => (
              <div key={event.id} className="bg-white border border-parchment-dark hover:border-lavender/40 p-7 rounded-3xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-lavender bg-lavender-soft px-3 py-1 rounded-full border border-lavender/25 mb-4">
                    {event.category}
                  </div>
                  <h3 className="font-display text-ink text-2xl font-bold mb-2">{event.title}</h3>
                  <div className="text-xs font-semibold text-stone mb-4 flex flex-wrap items-center gap-2">
                    <span className="bg-parchment px-2.5 py-1 rounded-md">{event.date}</span>
                    <span>&middot;</span>
                    <span>{event.time}</span>
                    <span>&middot;</span>
                    <span className="text-muted">{event.location}</span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All events */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-muted block mb-4">Upcoming Schedule</span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((event) => (
              <div key={event.id} className="bg-white border border-parchment-dark hover:border-lavender/40 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-lavender bg-lavender-soft px-2.5 py-0.5 rounded-full border border-lavender/20">
                      {event.category}
                    </span>
                    <span className="text-xs font-semibold text-stone">{event.date}</span>
                  </div>
                  <h3 className="font-display text-ink text-lg font-bold mb-2">{event.title}</h3>
                  <div className="text-xs text-muted mb-3">{event.time} &middot; {event.location}</div>
                  <p className="text-xs text-muted leading-relaxed line-clamp-3">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
