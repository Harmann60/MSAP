import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCommunityGroups } from '../services/dataService';

const DEFAULT_GROUPS = [
  { title: 'Pune Chapter', group_type: 'Regional', members_count: '120+', description: 'The original home chapter. Meetups, events, and networking in Pune.' },
  { title: 'Imphal Chapter', group_type: 'Regional', members_count: '80+', description: 'Alumni based in Manipur, connected through regular gatherings.' },
  { title: 'Tech Professionals', group_type: 'Professional', members_count: '45+', description: 'Software engineers, startup founders, and tech leads.' },
  { title: 'Healthcare Network', group_type: 'Professional', members_count: '30+', description: 'Alumni in medicine and healthcare fields.' },
  { title: 'Young Alumni', group_type: 'Interest', members_count: '60+', description: 'Recent graduates building careers and networks.' },
  { title: 'Women in Leadership', group_type: 'Affinity', members_count: '35+', description: 'Mentorship and leadership development for women alumni.' },
];

export default function CommunityPage() {
  const [groups, setGroups] = useState(DEFAULT_GROUPS);

  useEffect(() => {
    fetchCommunityGroups()
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setGroups(data);
        }
      })
      .catch((err) => {
        console.warn('Using offline community data:', err.message);
      });
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="max-w-6xl mx-auto px-5 pt-16 pb-12 md:pt-24 md:pb-16">
        <h1 className="font-display text-ink text-3xl md:text-4xl mb-2">Community</h1>
        <p className="text-muted text-sm">Groups by region, profession, and shared interest.</p>
      </div>

      <div className="max-w-6xl mx-auto px-5 pb-16 md:pb-24">
        {/* Stats — modern light card banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border border-parchment-dark rounded-3xl p-8 shadow-sm mb-14">
          {[
            { value: String(groups.length), label: 'Active groups' },
            { value: '370+', label: 'Members Connected' },
            { value: '3', label: 'Regional Chapters' },
            { value: '12+', label: 'Events Per Year' },
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="font-display text-ink text-3xl md:text-4xl font-bold">{stat.value}</div>
              <div className="text-muted text-xs font-semibold uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Groups */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-lavender">Active Community Chapters</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {groups.map((group, idx) => (
            <div key={group.id || idx} className="p-6 bg-white border border-parchment-dark hover:border-lavender/40 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-lavender bg-lavender-soft px-2.5 py-0.5 rounded-full border border-lavender/20">
                    {group.group_type || group.type}
                  </span>
                  <span className="text-xs font-semibold text-stone">{group.members_count || group.members} members</span>
                </div>
                <h3 className="font-display text-ink text-xl font-bold mb-2">{group.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{group.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Start a group CTA */}
        <div className="bg-gradient-to-r from-[#FAF9FC] to-[#F3EEFA] border border-parchment-dark p-10 rounded-3xl text-center shadow-sm max-w-3xl mx-auto">
          <h3 className="font-display text-ink text-2xl font-bold mb-2">Want to start a new chapter?</h3>
          <p className="text-sm text-stone mb-6 max-w-md mx-auto leading-relaxed">
            Whether it's a regional city chapter, an industry network, or an interest circle — our committee is here to assist.
          </p>
          <Link
            to="/about"
            className="inline-block bg-lavender hover:bg-lavender-light text-white font-semibold px-7 py-3 rounded-xl shadow-md shadow-lavender/25 text-sm transition-all hover:-translate-y-0.5"
          >
            Get in touch with the team →
          </Link>
        </div>
      </div>
    </div>
  );
}
