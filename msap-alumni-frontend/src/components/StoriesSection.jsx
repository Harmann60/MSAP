import { Link } from 'react-router-dom';

const STORIES = [
  {
    id: 1,
    title: 'From Pune to Silicon Valley: One Alumni\'s 30-Year Journey',
    source: 'MSAP Alumni Report',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop',
    excerpt: 'How a small group of Manipuri students in Pune went on to lead careers across the globe — and what brought them back to give.',
  },
  {
    id: 2,
    title: 'The Golden Jubilee: 200 Alumni, One Auditorium, 50 Years',
    source: 'Alumni Magazine',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop',
    excerpt: 'Over 200 alumni gathered at Symbiosis Ishanya Auditorium in Pune to mark half a century of community.',
  },
  {
    id: 3,
    title: 'Keeping Yaoshang Alive 1,200 km from Home',
    source: 'Community Spotlight',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop',
    excerpt: 'Every March, Manipuris in Pune gather to light the Yaoshang — and prove that culture travels with people, not just places.',
  },
];

export default function StoriesSection() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-16 md:py-24">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-10">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-lavender block mb-1">
            Voices & Memories
          </span>
          <h2 className="font-display text-ink text-2xl md:text-3xl font-semibold">
            Stories from MSAP Alumni
          </h2>
          <p className="text-muted text-sm mt-1">
            Chronicles of journeys, achievements, and 50 years of friendship.
          </p>
        </div>
        <Link
          to="/stories"
          className="text-lavender text-sm font-semibold hover:underline inline-flex items-center gap-1 group"
        >
          View all stories
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {STORIES.map((story) => (
          <Link
            key={story.id}
            to="/stories"
            className="group bg-white border-2 border-parchment-dark hover:border-lavender rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col"
          >
            <div className="aspect-[16/10] overflow-hidden bg-parchment-subtle relative">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-lavender bg-lavender-soft px-3 py-1 rounded-full border border-lavender/30 inline-block mb-3">
                  {story.source}
                </span>
                <h3 className="font-display text-ink text-xl font-bold leading-snug mb-2 group-hover:text-lavender transition-colors">
                  {story.title}
                </h3>
                <p className="text-[14px] text-stone leading-relaxed font-medium line-clamp-3">
                  {story.excerpt}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-parchment-dark text-xs font-bold text-lavender flex items-center gap-1.5">
                Read full story <span className="group-hover:translate-x-1.5 transition-transform text-sm">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
