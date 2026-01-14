"use client";

import { useMemo, useState } from "react";

const CONTEXTS = [
  "No context",
  "LinkedIn post",
  "Hiring",
  "Funding / growth",
  "Mutual industry",
] as const;

type ContextType = (typeof CONTEXTS)[number];

export default function Page() {
  const [role, setRole] = useState("VP Marketing");
  const [companyType, setCompanyType] = useState("B2B SaaS");
  const [context, setContext] = useState<ContextType>("No context");

  const [loading, setLoading] = useState(false);
  const [openers, setOpeners] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const canGenerate = useMemo(() => {
    return role.trim().length >= 2 && companyType.trim().length >= 2 && !loading;
  }, [role, companyType, loading]);

  async function generate() {
    setLoading(true);
    setError(null);
    setOpeners([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          companyType,
          context: context === "No context" ? "" : context,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Failed to generate openers");

      setOpeners(Array.isArray(data.openers) ? data.openers : []);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.main}>
      {/* ✅ 1) NAV goes here (inside main, before header) */}
      <nav style={styles.nav}>
        <a href="/pricing" style={styles.navLink}>Pricing</a>
        <a href="/terms" style={styles.navLink}>Terms</a>
        <a href="/refunds" style={styles.navLink}>Refunds</a>
      </nav>

      <header style={styles.header}>
        <div>
          <h1 style={styles.h1}>FirstLine</h1>
          <p style={styles.sub}>
            Generate <b>only</b> the first sentence of cold emails — short, human, non-spammy.
          </p>
        </div>

        <div style={styles.badgeWrap}>
          <span style={styles.badge}>MVP</span>
        </div>
      </header>

      <section style={styles.card}>
        <div style={styles.grid}>
          <label style={styles.label}>
            Prospect role
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. VP Marketing"
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Company type
            <input
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
              placeholder="e.g. B2B SaaS"
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Context
            <select
              value={context}
              onChange={(e) => setContext(e.target.value as ContextType)}
              style={styles.input}
            >
              {CONTEXTS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={styles.actions}>
          <button onClick={generate} disabled={!canGenerate} style={styles.primaryBtn}>
            {loading ? "Generating..." : "Generate openers"}
          </button>

          <span style={styles.micro}>
            Tip: choose a “Context” when you can — it improves relevance.
          </span>
        </div>

        {error && <p style={styles.error}>{error}</p>}
      </section>

      {/* ✅ 2) “WHAT YOU GET” goes here (after generator card, before results) */}
      <section style={{ marginTop: 16, ...styles.card }}>
        <h2 style={styles.h2}>What you get</h2>
        <ul style={{ lineHeight: 1.8, margin: 0, paddingLeft: 18 }}>
          <li><b>10 cold email opening sentences</b> per generation</li>
          <li>Each line is <b>one sentence</b>, short and human-sounding</li>
          <li>Built for founders, SDRs, recruiters, and freelancers</li>
        </ul>
      </section>

      {openers.length > 0 && (
        <section style={{ ...styles.card, marginTop: 16 }}>
          <h2 style={styles.h2}>Your openers</h2>

          <div style={styles.list}>
            {openers.map((line, idx) => (
              <div key={idx} style={styles.row}>
                <div style={{ flex: 1 }}>{line}</div>
                <button
                  style={styles.copyBtn}
                  onClick={() => navigator.clipboard.writeText(line)}
                  title="Copy"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <button onClick={generate} disabled={loading} style={styles.secondaryBtn}>
              Generate again
            </button>
          </div>
        </section>
      )}

      <footer style={styles.footer}>
        Keep it simple: pick 1 opener, paste it above your usual email template, send.
      </footer>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    maxWidth: 900,
    margin: "40px auto",
    padding: 16,
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  },
  nav: {
    display: "flex",
    gap: 16,
    marginBottom: 18,
    fontWeight: 800,
  },
  navLink: {
    color: "#111",
    textDecoration: "none",
    borderBottom: "1px solid transparent",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginBottom: 14,
  },
  h1: { fontSize: 36, margin: 0 },
  sub: { marginTop: 8, color: "#444", lineHeight: 1.4 },
  badgeWrap: { display: "flex", gap: 10, alignItems: "center" },
  badge: {
    border: "1px solid #ddd",
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: 12,
    fontWeight: 800,
    background: "white",
  },
  card: {
    border: "1px solid #eee",
    borderRadius: 14,
    padding: 16,
    boxShadow: "0 1px 12px rgba(0,0,0,0.04)",
    background: "white",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: 12,
  },
  label: { display: "grid", gap: 6, fontSize: 13, color: "#333" },
  input: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #ddd",
    outline: "none",
  },
  actions: { display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginTop: 12 },
  primaryBtn: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #111",
    background: "#111",
    color: "white",
    cursor: "pointer",
    fontWeight: 800,
  },
  secondaryBtn: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #ddd",
    background: "white",
    color: "#111",
    cursor: "pointer",
    fontWeight: 800,
  },
  micro: { color: "#666", fontSize: 13 },
  error: { color: "crimson", marginTop: 12 },
  h2: { marginTop: 0, marginBottom: 12 },
  list: { display: "grid", gap: 10 },
  row: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    border: "1px solid #eee",
    borderRadius: 12,
    padding: "10px 12px",
  },
  copyBtn: {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
    fontWeight: 800,
  },
  footer: { marginTop: 18, color: "#666", fontSize: 13 },
};



