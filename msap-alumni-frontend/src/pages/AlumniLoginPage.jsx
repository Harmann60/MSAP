import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { alumniLogin, googleLogin, setAlumniPassword } from '../services/alumniService';

export default function AlumniLoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'setPassword'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState(''); // 'not_registered' | 'pending' | 'needs_password' | 'rejected' | 'generic'
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in as alumni, redirect to home
  useEffect(() => {
    const token = sessionStorage.getItem('msap_alumni_token');
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const categorizeError = (msg = '') => {
    const lower = msg.toLowerCase();
    if (lower.includes('not been registered') || lower.includes('not registered') || lower.includes('no application found') || lower.includes('no alumni registration')) {
      return 'not_registered';
    }
    if (lower.includes('pending') || lower.includes('under review')) {
      return 'pending';
    }
    if (lower.includes('not approved') || lower.includes('rejected')) {
      return 'rejected';
    }
    if (lower.includes('password has been created') || lower.includes('no account password') || lower.includes('complete your account setup')) {
      return 'needs_password';
    }
    return 'generic';
  };

  const handleAuthSuccess = (data) => {
    if (data?.token) {
      if (data.user?.role === 'SUPER_ADMIN' || data.user?.isAdmin) {
        sessionStorage.setItem('msap_admin_token', data.token);
        sessionStorage.setItem('msap_admin_user', JSON.stringify(data.user));
        window.dispatchEvent(new Event('msap_auth_change'));
        navigate('/admin');
        return;
      }
      sessionStorage.setItem('msap_alumni_token', data.token);
      sessionStorage.setItem('msap_alumni_user', JSON.stringify(data.user));
      window.dispatchEvent(new Event('msap_auth_change'));
      navigate('/community');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setError('');
    setErrorType('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (mode === 'setPassword') {
        if (!password || password.length < 6) {
          setError('Password must be at least 6 characters long.');
          setErrorType('generic');
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError('Passwords do not match. Please re-enter.');
          setErrorType('generic');
          setLoading(false);
          return;
        }
        const data = await setAlumniPassword(email.trim(), password);
        setSuccessMessage('Password successfully saved! Signing you in...');
        setTimeout(() => handleAuthSuccess(data), 600);
      } else {
        if (!password) return;
        const data = await alumniLogin(email.trim(), password);
        handleAuthSuccess(data);
      }
    } catch (err) {
      const msg = err.message || 'Unable to sign in. Please verify your credentials or wait for admin verification.';
      setError(msg);
      setErrorType(categorizeError(msg));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setErrorType('');
    setSuccessMessage('');
    setLoading(true);

    try {
      // In development or when Google Client ID isn't pre-configured in browser window,
      // prompt user for their Google email or use the entered email
      let targetEmail = email.trim();
      if (!targetEmail) {
        targetEmail = window.prompt(
          'Sign in with Google:\nPlease enter your Google Account email address (e.g. your Gmail):'
        );
      }

      if (!targetEmail) {
        setLoading(false);
        return;
      }

      const data = await googleLogin({ email: targetEmail.trim().toLowerCase() });
      handleAuthSuccess(data);
    } catch (err) {
      const msg = err.message || 'Google Sign-In failed. Please try again.';
      setError(msg);
      setErrorType(categorizeError(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-[#F2EDFA] to-[#FAF9FC] flex flex-col items-center justify-center px-5 py-16">
      {/* Header */}
      <div className="text-center mb-8 max-w-md animate-heroIn">
        <span className="text-[11px] font-bold uppercase tracking-widest text-lavender block mb-1">
          Manipur Students' Association Pune
        </span>
        <h1 className="font-display text-ink text-3xl md:text-4xl font-bold">
          {mode === 'login' ? 'Alumni Sign In' : 'Set Account Password'}
        </h1>
        <p className="text-muted text-sm mt-2">
          {mode === 'login'
            ? 'Access the verified directory, event invites, and network updates.'
            : 'For approved alumni: link your password to your verified record to activate your account.'}
        </p>
      </div>

      {/* Decorative divider */}
      <div className="w-20 mx-auto mb-8 flex items-center gap-3 opacity-30">
        <div className="h-px flex-1 bg-lavender" />
        <div className="w-1.5 h-1.5 bg-lavender rotate-45" />
        <div className="h-px flex-1 bg-lavender" />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md animate-heroInDelay">
        <div className="border-2 border-parchment-dark bg-white rounded-3xl shadow-[0_16px_50px_rgba(28,20,46,0.1)] overflow-hidden">
          {/* Card Header & Mode Switcher */}
          <div className="p-6 sm:p-8 border-b-2 border-parchment-dark bg-gradient-to-r from-[#FAF9FC] to-[#F3EEFA]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-ink text-2xl font-bold">
                  {mode === 'login' ? 'Sign in to account' : 'Create password'}
                </h2>
                <p className="text-muted text-xs font-semibold mt-1">
                  {mode === 'login' ? 'For verified alumni members' : '3–5 days after admin approval'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'setPassword' : 'login');
                  setError('');
                  setErrorType('');
                }}
                className="text-xs font-bold text-lavender hover:text-lavender-dark underline decoration-lavender/40 hover:decoration-lavender transition-all"
              >
                {mode === 'login' ? 'Approved? Set password' : 'Back to Sign In'}
              </button>
            </div>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="mx-6 sm:mx-8 mt-6 p-4 rounded-2xl border-2 border-green-200 bg-green-50 text-green-800 text-xs font-semibold leading-relaxed">
              {successMessage}
            </div>
          )}

          {/* Context-Aware Error & Workflow Banners */}
          {error && (
            <div className="mx-6 sm:mx-8 mt-6">
              {errorType === 'not_registered' ? (
                <div className="p-4 rounded-2xl border-2 border-red-200 bg-red-50 text-red-800 text-xs leading-relaxed space-y-2.5">
                  <div className="flex items-start gap-2">
                    <span className="text-base leading-none">⚠️</span>
                    <div>
                      <strong className="block font-bold">Email Not Found</strong>
                      <span>{error}</span>
                    </div>
                  </div>
                  <Link
                    to="/register"
                    className="inline-block w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl transition-all shadow-sm"
                  >
                    Submit Alumni Verification Application →
                  </Link>
                </div>
              ) : errorType === 'pending' ? (
                <div className="p-4 rounded-2xl border-2 border-amber-200 bg-amber-50 text-amber-900 text-xs leading-relaxed space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="text-base leading-none">⏳</span>
                    <div>
                      <strong className="block font-bold text-amber-950">Verification in Progress</strong>
                      <span>{error}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-amber-800 mt-1">
                    Once the administrator verifies your details, you can sign in directly with Google or set your account password.
                  </p>
                </div>
              ) : errorType === 'needs_password' ? (
                <div className="p-4 rounded-2xl border-2 border-lavender/50 bg-lavender-soft text-lavender text-xs leading-relaxed space-y-2.5">
                  <div className="flex items-start gap-2">
                    <span className="text-base leading-none">🎉</span>
                    <div>
                      <strong className="block font-bold">Account Approved!</strong>
                      <span>{error}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('setPassword');
                      setError('');
                      setErrorType('');
                    }}
                    className="w-full bg-lavender hover:bg-lavender-dark text-white font-bold py-2 px-4 rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    Create Account Password Now →
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl border-2 border-lavender/40 bg-lavender-soft text-lavender text-xs leading-relaxed font-semibold">
                  <strong className="block font-bold mb-0.5">Notice:</strong>
                  {error}
                </div>
              )}
            </div>
          )}

          <div className="p-6 sm:p-8 space-y-5">
            {/* Google Sign-In Button (matches Wireframe Modal) */}
            {mode === 'login' && (
              <>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 border-2 border-parchment-dark bg-white hover:bg-slate-50 text-ink font-semibold py-3.5 px-4 rounded-xl shadow-sm transition-all hover:border-lavender/40 hover:-translate-y-0.5 cursor-pointer disabled:opacity-60 text-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                {/* Or divider */}
                <div className="relative flex items-center justify-center my-4">
                  <div className="border-t border-parchment-dark w-full" />
                  <span className="bg-white px-3 text-xs uppercase tracking-wider text-muted font-bold relative">
                    or
                  </span>
                  <div className="border-t border-parchment-dark w-full" />
                </div>
              </>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                  Email Address
                </label>
                <input
                  id="alumni-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@email.com"
                  className="w-full border-2 border-parchment-dark bg-white px-4 py-3 rounded-xl text-base text-ink focus:outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/25 transition-all placeholder:text-muted/60"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink">
                    {mode === 'login' ? 'Password' : 'New Password'}
                  </label>
                </div>
                <input
                  id="alumni-password"
                  type="password"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Min. 6 characters"
                  className="w-full border-2 border-parchment-dark bg-white px-4 py-3 rounded-xl text-base text-ink focus:outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/25 transition-all placeholder:text-muted/60"
                />
              </div>

              {mode === 'setPassword' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="alumni-confirm-password"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Re-enter password"
                    className="w-full border-2 border-parchment-dark bg-white px-4 py-3 rounded-xl text-base text-ink focus:outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/25 transition-all placeholder:text-muted/60"
                  />
                </div>
              )}

              <button
                id="alumni-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full bg-lavender hover:bg-lavender-dark text-white font-bold py-4 rounded-xl shadow-md transition-all text-base disabled:opacity-50 cursor-pointer hover:-translate-y-0.5 mt-2"
              >
                {loading
                  ? 'Processing...'
                  : mode === 'login'
                  ? 'Sign In →'
                  : 'Activate & Set Password →'}
              </button>
            </form>
          </div>

          <div className="px-6 sm:px-8 py-5 bg-[#FAF9FC] border-t-2 border-parchment-dark flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone font-medium">
            <span>Don't have an application submitted yet?</span>
            <Link to="/register" className="font-bold text-lavender hover:underline">
              Register for verification →
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-muted space-y-2">
          <p>
            Are you an administrator?{' '}
            <Link to="/admin/login" className="text-ink font-semibold hover:text-lavender transition-colors">
              Sign in to Admin Portal
            </Link>
          </p>
          <p>
            Questions? Contact{' '}
            <a href="mailto:alumni.msap1973@gmail.com" className="text-lavender hover:underline">
              alumni.msap1973@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
