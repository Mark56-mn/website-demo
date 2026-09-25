import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown, LogOut, Mail, Phone, RefreshCw } from "../components/Icons";
import { useAuth } from "../context/useAuth";
import { getSupabaseClient } from "../lib/supabase";
import { setPageMeta } from "../lib/seo";

type OrderRow = {
  id: string;
  business_name: string;
  category: string | null;
  country: string | null;
  city: string | null;
  phone: string | null;
  email: string | null;
  status: string | null;
  style: string | null;
  created_at: string;
  services: string | null;
  notes: string | null;
};

const statusOptions = ["All", "NEW", "CONTACTED", "PAYMENT_PENDING", "PAID", "BUILDING", "PREVIEW", "REVISION", "COMPLETED", "CANCELLED"];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function AdminPage() {
  const { session, signOut } = useAuth();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError("");
    const supabase = getSupabaseClient();
    if (!supabase) {
      setError("Admin database is not configured.");
      setLoading(false);
      return;
    }
    const { data, error: queryError } = await supabase.from("orders").select("id,business_name,category,country,city,phone,email,status,style,created_at,services,notes").order("created_at", { ascending: false });
    if (queryError) setError(queryError.message);
    else setOrders((data ?? []) as OrderRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => void loadOrders(), 0);
    setPageMeta("Orders admin — Website Demo", "Private Website Demo order management dashboard.");
    return () => window.clearTimeout(timeout);
  }, [loadOrders]);

  const filteredOrders = useMemo(() => status === "All" ? orders : orders.filter(order => order.status === status), [orders, status]);
  const newCount = orders.filter(order => order.status === "NEW").length;
  const activeCount = orders.filter(order => ["PAID", "BUILDING", "PREVIEW", "REVISION"].includes(order.status ?? "")).length;
  const email = session?.user.email ?? "Admin";

  return <div className="admin-shell"><aside className="admin-sidebar"><Link to="/" className="admin-brand"><span className="brand-mark">W</span><span>Website<span className="brand-accent">Demo</span></span></Link><div className="admin-sidebar-label">Workspace</div><Link to="/admin" className="admin-nav-active"><span>▦</span> Orders</Link><Link to="/"><span>↗</span> View website</Link><div className="admin-sidebar-bottom"><div className="admin-user"><span>{email.slice(0, 1).toUpperCase()}</span><div><strong>{email}</strong><small>Administrator</small></div></div><button onClick={() => void signOut()}><LogOut /> Sign out</button></div></aside><main className="admin-main"><header className="admin-header"><div><span className="eyebrow">Private workspace</span><h1>Orders</h1><p>Manage requests from first message to launch.</p></div><button className="admin-refresh" onClick={() => void loadOrders()} disabled={loading}><RefreshCw /> Refresh</button></header><div className="admin-stats"><div><span>Total requests</span><strong>{orders.length}</strong><small>All time</small></div><div><span>New requests</span><strong>{newCount}</strong><small>Need first response</small></div><div><span>Active builds</span><strong>{activeCount}</strong><small>In progress</small></div></div><section className="orders-card"><div className="orders-toolbar"><div><h2>Customer requests</h2><p>{filteredOrders.length} {filteredOrders.length === 1 ? "request" : "requests"}</p></div><label className="admin-filter"><span>Status</span><select value={status} onChange={e => setStatus(e.target.value)}>{statusOptions.map(option => <option key={option}>{option}</option>)}</select><ChevronDown /></label></div>{error && <div className="admin-error" role="alert">{error}</div>}{loading ? <div className="admin-empty">Loading orders…</div> : filteredOrders.length === 0 ? <div className="admin-empty"><span>◎</span><h3>No orders in this view</h3><p>New customer requests will appear here after they submit the form.</p></div> : <div className="orders-list">{filteredOrders.map(order => <article className={`order-row ${expanded === order.id ? "expanded" : ""}`} key={order.id}><button className="order-row-main" onClick={() => setExpanded(expanded === order.id ? null : order.id)}><span className="order-avatar">{order.business_name.slice(0, 2).toUpperCase()}</span><span className="order-summary"><strong>{order.business_name}</strong><small>{order.category ?? "Business"} · {order.city ?? "Location pending"}</small></span><span className={`status-pill status-${(order.status ?? "new").toLowerCase()}`}>{order.status ?? "NEW"}</span><span className="order-date">{formatDate(order.created_at)}</span><ChevronDown className="order-chevron" /></button>{expanded === order.id && <div className="order-details"><div><span>Contact</span><a href={`tel:${order.phone ?? ""}`}><Phone />{order.phone ?? "No phone provided"}</a>{order.email && <a href={`mailto:${order.email}`}><Mail />{order.email}</a>}</div><div><span>Project details</span><p>{order.services || "No service details provided."}</p></div><div><span>Style</span><p>{order.style || "Not specified"}</p></div><div><span>Notes</span><p>{order.notes || "No additional notes."}</p></div><a className="button button-primary" href={`mailto:${order.email ?? ""}?subject=Your Website Demo request`}>Contact customer <ArrowUpRight /></a></div>}</article>)}</div>}</section></main></div>;
}
