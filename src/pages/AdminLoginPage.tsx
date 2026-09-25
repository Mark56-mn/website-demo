import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import { ArrowRight, Shield } from "../components/Icons";
import { useAuth } from "../context/useAuth";
import { setPageMeta } from "../lib/seo";
import { useEffect } from "react";

export default function AdminLoginPage() {
  const { signIn, configured, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const destination = (location.state as { from?: string } | null)?.from ?? "/admin";

  useEffect(() => setPageMeta("Admin login — Website Demo", "Private Website Demo order management login."), []);
  useEffect(() => {
    if (session) navigate(destination, { replace: true });
  }, [destination, navigate, session]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Enter your admin email and password.");
      return;
    }
    setSubmitting(true);
    const result = await signIn(email.trim(), password);
    setSubmitting(false);
    if (result.error) setError(result.error);
  };

  return <SiteLayout><section className="auth-page"><div className="auth-card"><div className="auth-icon"><Shield /></div><span className="eyebrow">Private workspace</span><h1>Admin sign in</h1><p>Review new website orders and keep your customer pipeline in one place.</p>{!configured ? <div className="auth-config"><strong>Admin access is not configured yet.</strong><p>Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>, then create an admin user in Supabase Auth.</p></div> : <form onSubmit={submit} noValidate><label className="field"><span>Admin email</span><input type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@yourbusiness.com" /></label><label className="field"><span>Password</span><input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" /></label>{error && <div className="auth-error" role="alert">{error}</div>}<button className="button button-primary button-full" disabled={submitting}>{submitting ? "Signing in…" : "Sign in"}<ArrowRight /></button></form>}<Link className="auth-back" to="/">← Back to website</Link></div></section></SiteLayout>;
}
