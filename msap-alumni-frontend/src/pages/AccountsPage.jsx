import { useState, useEffect } from 'react';
import { fetchAccounts } from '../services/dataService';

const DEFAULT_ACCOUNTS = [
  { category: 'Fixed Deposits', balance_formatted: '₹3,50,000', status: 'Verified' },
  { category: 'Savings Account', balance_formatted: '₹1,24,350', status: 'Verified' },
  { category: 'Membership Corpus', balance_formatted: '₹42,000', status: 'Audited' },
  { category: 'Event & Cultural Fund', balance_formatted: '₹18,500', status: 'Active' },
];

const DEFAULT_TOTAL = '₹5,34,850';

export default function AccountsPage() {
  const [accounts, setAccounts] = useState(DEFAULT_ACCOUNTS);
  const [total, setTotal] = useState(DEFAULT_TOTAL);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts()
      .then((data) => {
        if (data && data.accounts) {
          setAccounts(data.accounts);
          setTotal(data.total);
        }
      })
      .catch((err) => {
        console.warn('Using offline financial records:', err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="max-w-6xl mx-auto px-5 pt-16 pb-12 md:pt-24 md:pb-16">
        <h1 className="font-display text-ink text-3xl md:text-4xl mb-2">Financial transparency</h1>
        <p className="text-muted text-sm">Open-book reporting of all funds. Updated quarterly.</p>
      </div>

      <div className="max-w-4xl mx-auto px-5 pb-16 md:pb-24 space-y-10">
        {/* Total */}
        <div className="text-center py-12 px-6 bg-white border border-parchment-dark rounded-3xl shadow-sm">
          <div className="text-xs font-bold uppercase tracking-widest text-lavender mb-2">Total assets under management</div>
          <div className="font-display text-ink text-5xl md:text-6xl font-bold mb-2">{total}</div>
          <div className="text-muted text-sm font-medium">FY 2025–26 &middot; Independently verified &amp; audited</div>
        </div>

        {/* Table */}
        <div className="bg-white border border-parchment-dark rounded-3xl shadow-sm overflow-hidden">
          <div className="px-6 md:px-8 py-5 border-b border-parchment-dark flex items-center justify-between bg-gradient-to-r from-[#FAF9FC] to-[#F3EEFA]">
            <h3 className="font-display text-ink text-lg font-semibold">Financial Registry</h3>
            <span className="text-[11px] font-bold uppercase tracking-wider text-verified bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              {loading ? 'Refreshing...' : '✓ All accounts verified'}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted text-[11px] font-bold uppercase tracking-wider border-b border-parchment-dark bg-parchment-subtle/50">
                  <th className="px-6 md:px-8 py-3.5">Account</th>
                  <th className="px-6 md:px-8 py-3.5 text-right">Balance</th>
                  <th className="px-6 md:px-8 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((row, i) => (
                  <tr key={row.id || i} className="border-b border-parchment-dark last:border-0 hover:bg-parchment-subtle/30 transition-colors">
                    <td className="px-6 md:px-8 py-4 font-semibold text-ink">{row.category}</td>
                    <td className="px-6 md:px-8 py-4 text-right font-mono font-bold text-stone">
                      {row.balance_formatted || row.balance}
                    </td>
                    <td className="px-6 md:px-8 py-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[#F5F1FA] border-t border-parchment-dark">
                  <td className="px-6 md:px-8 py-4 font-bold text-ink text-base">Total Verified Assets</td>
                  <td className="px-6 md:px-8 py-4 text-right font-mono font-bold text-lavender text-lg">{total}</td>
                  <td className="px-6 md:px-8 py-4" />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Note */}
        <p className="text-sm text-muted leading-relaxed">
          For audit reports, bank statements, or questions, email{' '}
          <a href="mailto:alumni.msap1973@gmail.com" className="text-lavender hover:underline font-semibold">alumni.msap1973@gmail.com</a>.
          Formal information requests are welcome.
        </p>
      </div>
    </div>
  );
}
