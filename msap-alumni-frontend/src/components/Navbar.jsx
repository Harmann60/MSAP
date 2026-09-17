import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  {
    label: 'Events',
    children: [
      { heading: 'Events', links: [
        { label: 'All Events', to: '/events' },
        { label: 'Annual Meet', to: '/events' },
        { label: 'Cultural Events', to: '/events' },
        { label: 'Career Events', to: '/events' },
      ]},
      { heading: 'Past Events', links: [
        { label: '2025 Highlights', to: '/events' },
        { label: 'Golden Jubilee', to: '/events' },
      ]},
    ],
  },
  {
    label: 'Stories',
    children: [
      { heading: 'Stories', links: [
        { label: 'All Stories', to: '/stories' },
        { label: 'Alumni Spotlight', to: '/stories' },
        { label: 'Class Notes', to: '/stories' },
      ]},
      { heading: 'Resources', links: [
        { label: 'Newsletters', to: '/stories' },
        { label: 'Learning', to: '/stories' },
      ]},
    ],
  },
  {
    label: 'Community',
    children: [
      { heading: 'Groups', links: [
        { label: 'All Groups', to: '/community' },
        { label: 'Pune Chapter', to: '/community' },
        { label: 'Imphal Chapter', to: '/community' },
      ]},
      { heading: 'People', links: [
        { label: 'Young Alumni', to: '/community' },
        { label: 'Professional Networks', to: '/community' },
      ]},
    ],
  },
  {
    label: 'About',
    children: [
      { heading: 'About', links: [
        { label: 'Our History', to: '/about' },
        { label: 'Governing Body', to: '/about' },
        { label: 'Contact', to: '/about' },
      ]},
      { heading: 'Trust', links: [
        { label: 'Financial Transparency', to: '/accounts' },
        { label: 'Society Registration', to: '/about' },
      ]},
    ],
  },
];

export default function Navbar() {
  const [activeMega, setActiveMega] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const location = useLocation();
  const timeoutRef = useRef(null);

  const prevPathname = useRef(location.pathname);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('msap_alumni_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleAuthChange = () => {
      try {
        const stored = sessionStorage.getItem('msap_alumni_user');
        setCurrentUser(stored ? JSON.parse(stored) : null);
      } catch {
        setCurrentUser(null);
      }
    };
    window.addEventListener('msap_auth_change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);
    return () => {
      window.removeEventListener('msap_auth_change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const handleSignOut = () => {
    sessionStorage.removeItem('msap_alumni_token');
    sessionStorage.removeItem('msap_alumni_user');
    setCurrentUser(null);
    window.dispatchEvent(new Event('msap_auth_change'));
  };

  useEffect(() => {
    if (prevPathname.current !== location.pathname) {
      setMobileOpen(false);
      setMobileExpanded(null);
      setActiveMega(null);
      prevPathname.current = location.pathname;
    }
  }, [location.pathname]);

  const handleMouseEnter = (idx) => {
    clearTimeout(timeoutRef.current);
    setActiveMega(idx);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMega(null), 120);
  };

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-md text-ink sticky top-0 z-50 border-b border-parchment-dark/80 shadow-[0_2px_16px_rgba(35,26,56,0.03)]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <img src="/logo.png" alt="MSAP Alumni" className="w-8 h-8 object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
              <div>
                <span className="font-display text-ink group-hover:text-lavender transition-colors text-base font-semibold leading-none block">MSAP Alumni</span>
                <span className="text-muted text-[10px] tracking-wider uppercase font-medium">Est. 1973</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1.5 h-full">
              {NAV_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`text-[14px] font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${
                      activeMega === idx
                        ? 'text-lavender bg-lavender-soft font-bold'
                        : 'text-stone hover:text-lavender hover:bg-parchment-subtle'
                    }`}
                  >
                    {item.label}
                    <svg className={`w-3.5 h-3.5 transition-transform ${activeMega === idx ? 'rotate-180 text-lavender' : 'text-muted'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeMega === idx && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[500px] bg-white border border-parchment-dark shadow-[0_20px_50px_rgba(28,20,46,0.12)] rounded-2xl overflow-hidden z-50 animate-heroIn">
                      <div className="grid grid-cols-2 gap-0 p-6">
                        {item.children.map((group, gi) => (
                          <div key={gi} className={gi > 0 ? 'pl-6 border-l border-parchment-dark' : ''}>
                            <div className="text-[11px] font-bold uppercase tracking-widest text-lavender mb-3">{group.heading}</div>
                            <ul className="space-y-2">
                              {group.links.map((link, li) => (
                                <li key={li}>
                                  <Link
                                    to={link.to}
                                    className="text-[14px] font-medium text-stone hover:text-lavender block py-1 transition-colors"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              {currentUser ? (
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-bold text-ink bg-lavender-soft border border-lavender/30 px-3.5 py-1.5 rounded-full flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-verified inline-block" />
                    {currentUser.fullName?.split(' ')[0] || 'Alumnus'}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="text-[13px] font-semibold text-muted hover:text-vermilion px-2.5 py-1 transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3.5">
                  <Link
                    to="/login"
                    className="text-[14px] font-semibold text-stone hover:text-lavender transition-colors px-3 py-1.5"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="text-[14px] font-bold text-white bg-lavender hover:bg-lavender-dark px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-ink hover:text-lavender p-1.5 rounded-lg"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-parchment-dark max-h-[75vh] overflow-y-auto shadow-xl">
            <div className="px-5 py-4 space-y-1">
              {NAV_ITEMS.map((item, idx) => (
                <div key={idx}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left text-sm font-medium text-stone py-2.5 hover:text-lavender transition-colors"
                  >
                    {item.label}
                    <svg className={`w-4 h-4 transition-transform ${mobileExpanded === idx ? 'rotate-180 text-lavender' : 'text-muted'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileExpanded === idx && (
                    <div className="pl-3 pb-3 space-y-2">
                      {item.children.map((group, gi) => (
                        <div key={gi}>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-lavender mb-1">{group.heading}</div>
                          {group.links.map((link, li) => (
                            <Link
                              key={li}
                              to={link.to}
                              className="block text-sm text-stone/80 hover:text-lavender py-1 transition-colors"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-parchment-dark space-y-2">
                {currentUser ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-xs text-stone py-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-verified inline-block" />
                      Signed in as <strong>{currentUser.fullName}</strong>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-center text-sm font-semibold text-muted hover:text-vermilion border border-parchment-dark py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block w-full text-center text-sm font-semibold text-stone border border-parchment-dark py-2.5 rounded-lg hover:border-lavender hover:text-lavender transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="block w-full text-center text-sm font-semibold text-white bg-lavender hover:bg-lavender-light py-2.5 rounded-lg shadow-sm shadow-lavender/25 transition-colors"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
