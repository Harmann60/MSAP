import { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitRegistration } from '../services/alumniService';

function Field({ label, name, type = 'text', placeholder, required, value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
        {label}{required && <span className="text-lavender ml-0.5">*</span>}
      </label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        className="w-full border-2 border-parchment-dark bg-white px-4 py-3 rounded-xl text-base text-ink focus:outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/25 transition-all placeholder:text-muted/60"
      />
    </div>
  );
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', puneCollege: '',
    batchYear: '', currentLocation: '', profession: '',
    password: '', confirmPassword: '',
    hp_website: '', // Hidden honeypot field for bot detection
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    if (formData.password && formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify both password fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = { ...formData };
      delete payload.confirmPassword;
      await submitRegistration(payload);
      setSubmitted(true);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit registration. Please check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-b from-[#F2EDFA] to-[#FAF9FC] min-h-[75vh] flex flex-col justify-center">
        <div className="max-w-lg mx-auto text-center py-16 px-5 bg-white border border-parchment-dark rounded-3xl shadow-lg shadow-lavender/10">
          <div className="w-16 h-16 rounded-full bg-lavender-soft text-lavender flex items-center justify-center text-3xl font-bold mx-auto mb-4 border border-lavender/25">
            ✓
          </div>
          <h2 className="font-display text-ink text-2xl md:text-3xl font-semibold mb-3">Registration Submitted</h2>
          <p className="text-stone mb-8 leading-relaxed text-sm max-w-md mx-auto">
            Thank you, <strong className="text-ink">{formData.fullName}</strong>. Your account credentials have been securely stored.
            An administrator will review and verify your alumni submission within 3–5 days. Once approved, you will receive an email at <strong className="text-ink">{formData.email}</strong> and can sign in to the alumni network.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/login"
              className="w-full sm:w-auto bg-lavender hover:bg-lavender-light text-white font-semibold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-lavender/20"
            >
              Go to Sign In →
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  fullName: '', email: '', phone: '', puneCollege: '',
                  batchYear: '', currentLocation: '', profession: '',
                  password: '', confirmPassword: '', hp_website: '',
                });
              }}
              className="text-sm font-semibold text-stone hover:text-lavender transition-colors py-2 px-4"
            >
              Register another person
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#F4EFFB] to-[#FAF9FC] min-h-[85vh]">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-5 pt-14 pb-8 md:pt-20 md:pb-12 text-center">
        <span className="text-[11px] font-bold uppercase tracking-widest text-lavender block mb-1">
          Manipur Students' Association Pune
        </span>
        <h1 className="font-display text-ink text-3xl md:text-4xl font-bold mb-2">Join the Alumni Network</h1>
        <p className="text-muted text-sm max-w-md mx-auto">Verify your alumni status and connect with Manipuri graduates across the globe.</p>
      </div>

      <div className="max-w-2xl mx-auto px-5 pb-16 md:pb-24">
        <div className="bg-white border-2 border-parchment-dark rounded-3xl shadow-[0_16px_50px_rgba(28,20,46,0.1)] overflow-hidden">
          <div className="p-6 md:p-8 border-b-2 border-parchment-dark bg-gradient-to-r from-[#FAF9FC] to-[#F3EEFA]">
            <h2 className="font-display text-ink text-2xl font-bold">Alumni Registration Form</h2>
            <p className="text-muted text-xs font-semibold mt-1">Your submission will be reviewed manually by the MSAP administrator.</p>
          </div>

          {errorMessage && (
            <div className="mx-6 md:mx-8 mt-6 p-4 rounded-2xl border-2 border-red-200 bg-red-50 text-red-700 text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            {/* Hidden honeypot field */}
            <input
              type="text"
              name="hp_website"
              value={formData.hp_website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              className="hidden opacity-0 pointer-events-none absolute"
              aria-hidden="true"
            />

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full name" name="fullName" placeholder="Your full name" required value={formData.fullName} onChange={handleChange} />
              <Field label="Email address" name="email" type="email" placeholder="you@email.com" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Phone number" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} />
              <Field label="Pune college" name="puneCollege" placeholder="e.g. Symbiosis, Ferguson, MIT" value={formData.puneCollege} onChange={handleChange} />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Batch year" name="batchYear" type="number" placeholder="e.g. 2012" value={formData.batchYear} onChange={handleChange} />
              <Field label="Current location" name="currentLocation" placeholder="City, Country" value={formData.currentLocation} onChange={handleChange} />
            </div>
            <Field label="Profession / Role" name="profession" placeholder="e.g. Software Engineer at TCS" value={formData.profession} onChange={handleChange} />

            {/* Account Password Section */}
            <div className="pt-5 border-t-2 border-parchment-dark space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ink">
                  Account Password
                </p>
                <p className="text-muted text-xs font-medium mt-0.5">
                  Set the password you'll use to log in once your alumni status is verified by the admin.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Min. 6 characters"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <Field
                  label="Confirm password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-type password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-lavender hover:bg-lavender-dark text-white font-bold py-4 rounded-xl shadow-md transition-all text-base disabled:opacity-60 cursor-pointer hover:-translate-y-0.5"
              >
                {isSubmitting ? 'Submitting securely...' : 'Submit Registration →'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
