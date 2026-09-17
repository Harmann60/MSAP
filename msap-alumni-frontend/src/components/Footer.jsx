import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#F5F2F9] border-t border-parchment-dark text-muted">
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display text-ink font-bold text-lg block mb-3 hover:text-lavender transition-colors">
              MSAP Alumni
            </Link>
            <p className="text-stone/80 text-xs leading-relaxed">
              Sagolband Moirang Leirak<br />
              Imphal West, 795001<br />
              Manipur, India
            </p>
            <p className="text-muted text-[11px] mt-3">Society No. 915/M/SR/2025</p>
          </div>

          {/* Links */}
          <div>
            <div className="text-ink font-bold text-xs uppercase tracking-wider mb-3">Navigate</div>
            <ul className="space-y-2">
              <li><Link to="/" className="text-stone/80 hover:text-lavender transition-colors">Home</Link></li>
              <li><Link to="/events" className="text-stone/80 hover:text-lavender transition-colors">Events</Link></li>
              <li><Link to="/stories" className="text-stone/80 hover:text-lavender transition-colors">Stories</Link></li>
              <li><Link to="/community" className="text-stone/80 hover:text-lavender transition-colors">Community</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-ink font-bold text-xs uppercase tracking-wider mb-3">Association</div>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-stone/80 hover:text-lavender transition-colors">About</Link></li>
              <li><Link to="/accounts" className="text-stone/80 hover:text-lavender transition-colors">Finances</Link></li>
              <li><Link to="/register" className="text-stone/80 hover:text-lavender transition-colors">Register</Link></li>
              <li><Link to="/admin/login" className="text-stone/80 hover:text-lavender transition-colors">Admin Portal</Link></li>
              <li><a href="mailto:alumni.msap1973@gmail.com" className="text-stone/80 hover:text-lavender transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-ink font-bold text-xs uppercase tracking-wider mb-3">Reach us</div>
            <a href="mailto:alumni.msap1973@gmail.com" className="text-lavender hover:underline block mb-2 font-medium">
              alumni.msap1973@gmail.com
            </a>
            <div className="flex gap-3 mt-4">
              {['Facebook', 'LinkedIn', 'Instagram'].map((s) => (
                <a key={s} href="#" className="text-xs text-muted hover:text-lavender transition-colors uppercase tracking-wider font-semibold">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-parchment-dark bg-[#ECE6F5]/50">
        <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-muted">
          <span>&copy; {year} Association of MSAP Alumni</span>
          <div className="flex gap-4">
            <Link to="/admin/login" className="hover:text-lavender transition-colors">Admin</Link>
            <a href="#" className="hover:text-lavender transition-colors">Privacy</a>
            <a href="#" className="hover:text-lavender transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
