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
  const [context, setContext] = useState("Funding / growth");

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
          context: context.trim(),
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
    <div style={styles.page}>
      {/* Top bar */}
      <header style={styles.topbar}>
        <div style={styles.brand}>
          <div style={styles.logoMark}>FL</div>
          <div>
            <div style={styles.brandName}>FirstLine</div>
            <div style={styles.brandTag}>Cold email openers that sound human.</div>
          </div>
        </div>

        {/* Paddle-required navigation */}
        <nav style={styles.nav}>
          <a href="/pricing" style={styles.navLink}>Pricing</a>
          <a href="/terms" style={styles.navLink}>Terms</a>
          <a href="/refunds" style={styles.navLink}>Refunds</a>
        </nav>
      </header>

      {/* Hero */}
      <main style={styles.main}>
        <section style={styles.hero}>
          <div style={styles.heroLeft}>
            <div style={styles.kicker}>One sentence. No spam.</div>
            <h1 style={styles.h1}>
              Generate cold email opening lines that don’t feel like AI.
            </h1>
            <p style={styles.sub}>
              FirstLine gives you <b>10 short first sentences</b> tailored to a prospect’s role,
              company type, and context — so you can start conversations faster.
            </p>

            <div style={styles.heroBadges}>
              <span style={styles.pill}>10 openers / click</span>
              <span style={styles.pill}>Max ~20 words</span>
              <span style={styles.pill}>No fluff</span>
            </div>
          </div>

          <div style={styles.heroRight}>
            <div style={styles.exampleCard}>
              <div style={styles.exampleTitle}>Before</div>
              <div style={styles.exampleTextMuted}>
                “Hope you’re well — I wanted to reach out to introduce myself...”
              </div>

              <div style={{ height: 12 }} />

              <div style={styles.exampleTitle}>After</div>
              <div style={styles.exampleText}>
                “Saw you’re scaling pipeline this quarter — curious what you’re prioritizing in outbound to keep reply rates up.”
              </div>

              <div style={styles.exampleFootnote}>
                You’ll get 10 variations like this per generation.
              </div>
            </div>
          </div>
        </section>

        {/* Generator */}
        <section style={styles.panel}>
          <div style={styles.panelHeader}>
            <div>
              <h2 style={styles.h2}>Generate openers</h2>
              <p style={styles.panelSub}>
                You provide the context. We generate the first sentence only.
              </p>
            </div>

            <a href="/pricing" style={styles.pricingLink}>
              Pro: $9/mo → Unlimited
            </a>
          </div>

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
  Context (optional)
  <input
    value={context}
    onChange={(e) => setContext(e.target.value)}
    placeholder="e.g. Hiring SDRs, recent funding, LinkedIn post, product launch…"
    style={styles.input}
  />
</label>

          </div>

          <div style={styles.actions}>
            <button onClick={generate} disabled={!canGenerate} style={styles.primaryBtn}>
              {loading ? "Generating..." : "Generate openers"}
            </button>

            <div style={styles.microWrap}>
              <div style={styles.microStrong}>Safe usage:</div>
              <div style={styles.micro}>No scraping. No email sending. You provide the inputs.</div>
            </div>
          </div>

          {error && <p style={styles.error}>{error}</p>}
        </section>

        {/* Results */}
        {openers.length > 0 && (
          <section style={{ ...styles.panel, marginTop: 16 }}>
            <div style={styles.panelHeader}>
              <h2 style={styles.h2}>Your openers</h2>
              <button onClick={generate} disabled={loading} style={styles.secondaryBtn}>
                Generate again
              </button>
            </div>

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
          </section>
        )}

        {/* What you get */}
        <section style={{ ...styles.panel, marginTop: 16 }}>
          <h2 style={styles.h2}>What you get</h2>

          <div style={styles.featureGrid}>
            <div style={styles.feature}>
              <div style={styles.featureTitle}>10 first lines</div>
              <div style={styles.featureText}>Each click returns 10 one-sentence openers.</div>
            </div>

            <div style={styles.feature}>
              <div style={styles.featureTitle}>Short & human</div>
              <div style={styles.featureText}>Designed to sound natural, not “salesy” or robotic.</div>
            </div>

            <div style={styles.feature}>
              <div style={styles.featureTitle}>Copy, paste, send</div>
              <div style={styles.featureText}>Pick one opener and use it in your existing template.</div>
            </div>
          </div>

          <div style={{ marginTop: 12, color: "#475467", fontSize: 13 }}>
            Free plan: limited usage • Pro: $9/month unlimited • Cancel anytime
          </div>
        </section>

        <footer style={styles.footer}>
          © {new Date().getFullYear()} FirstLine •{" "}
          <a href="/pricing" style={styles.footerLink}>Pricing</a> •{" "}
          <a href="/terms" style={styles.footerLink}>Terms</a> •{" "}
          <a href="/refunds" style={styles.footerLink}>Refunds</a>
        </footer>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 600px at 20% -10%, rgba(99,102,241,0.18), rgba(255,255,255,0) 60%)," +
      "radial-gradient(1000px 500px at 85% 10%, rgba(16,185,129,0.12), rgba(255,255,255,0) 55%)," +
      "#F8FAFC",
    color: "#0F172A",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  },
  topbar: {
    maxWidth: 1040,
    margin: "0 auto",
    padding: "18px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
  },
  brand: { display: "flex", alignItems: "center", gap: 12 },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 10,
    display: "grid",
    placeItems: "center",
    fontWeight: 900,
    color: "white",
    background: "linear-gradient(135deg, #4F46E5, #0EA5E9)",
    boxShadow: "0 8px 22px rgba(79,70,229,0.25)",
  },
  brandName: { fontWeight: 900, fontSize: 16, lineHeight: 1.1 },
  brandTag: { fontSize: 12, color: "#475467", marginTop: 2 },

  nav: { display: "flex", gap: 14, fontWeight: 800, fontSize: 13 },
  navLink: {
    textDecoration: "none",
    color: "#0F172A",
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(15,23,42,0.08)",
    background: "rgba(255,255,255,0.75)",
  },

  main: { maxWidth: 1040, margin: "0 auto", padding: "0 16px 40px" },

  hero: {
    display: "grid",
    gridTemplateColumns: "1.15fr 0.85fr",
    gap: 16,
    alignItems: "stretch",
    marginTop: 6,
  },
  heroLeft: {
    borderRadius: 18,
    padding: 20,
    background: "rgba(255,255,255,0.75)",
    border: "1px solid rgba(15,23,42,0.08)",
    boxShadow: "0 1px 18px rgba(2,6,23,0.06)",
  },
  heroRight: {
    borderRadius: 18,
    padding: 20,
    background: "rgba(255,255,255,0.75)",
    border: "1px solid rgba(15,23,42,0.08)",
    boxShadow: "0 1px 18px rgba(2,6,23,0.06)",
  },
  kicker: {
    display: "inline-flex",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 900,
    color: "#1F2937",
    background: "rgba(79,70,229,0.10)",
    border: "1px solid rgba(79,70,229,0.18)",
  },
  h1: { margin: "12px 0 0", fontSize: 40, lineHeight: 1.08, letterSpacing: -0.6 },
  sub: { marginTop: 10, color: "#334155", lineHeight: 1.5, fontSize: 15 },

  heroBadges: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 },
  pill: {
    padding: "7px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    background: "rgba(255,255,255,0.85)",
    border: "1px solid rgba(15,23,42,0.10)",
    color: "#0F172A",
  },

  exampleCard: {
    borderRadius: 14,
    padding: 14,
    border: "1px solid rgba(15,23,42,0.10)",
    background: "white",
  },
  exampleTitle: { fontSize: 12, fontWeight: 900, color: "#475467", marginBottom: 6 },
  exampleTextMuted: { color: "#667085", lineHeight: 1.5 },
  exampleText: { color: "#0F172A", fontWeight: 700, lineHeight: 1.5 },
  exampleFootnote: { marginTop: 10, fontSize: 12, color: "#667085" },

  panel: {
    marginTop: 16,
    borderRadius: 18,
    padding: 18,
    background: "rgba(255,255,255,0.85)",
    border: "1px solid rgba(15,23,42,0.08)",
    boxShadow: "0 1px 18px rgba(2,6,23,0.06)",
  },
  panelHeader: { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" },
  h2: { margin: 0, fontSize: 18, letterSpacing: -0.2 },
  panelSub: { margin: "6px 0 0", color: "#475467", fontSize: 13 },

  pricingLink: {
    textDecoration: "none",
    color: "#0F172A",
    fontWeight: 900,
    fontSize: 13,
    padding: "10px 12px",
    borderRadius: 12,
    background: "rgba(79,70,229,0.10)",
    border: "1px solid rgba(79,70,229,0.18)",
  },

  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginTop: 14 },
  label: { display: "grid", gap: 6, fontSize: 13, color: "#0F172A", fontWeight: 800 },
  input: {
    padding: "11px 12px",
    borderRadius: 12,
    border: "1px solid rgba(15,23,42,0.12)",
    outline: "none",
    background: "white",
  },

  actions: { display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginTop: 14 },
  primaryBtn: {
    padding: "11px 14px",
    borderRadius: 12,
    border: "1px solid rgba(79,70,229,0.45)",
    background: "linear-gradient(135deg, #4F46E5, #0EA5E9)",
    color: "white",
    cursor: "pointer",
    fontWeight: 900,
  },
  secondaryBtn: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(15,23,42,0.12)",
    background: "white",
    color: "#0F172A",
    cursor: "pointer",
    fontWeight: 900,
  },
  microWrap: { display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" },
  microStrong: { fontSize: 13, fontWeight: 900, color: "#0F172A" },
  micro: { fontSize: 13, color: "#475467" },

  error: { color: "#B42318", marginTop: 12, fontWeight: 800 },

  list: { display: "grid", gap: 10, marginTop: 14 },
  row: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    border: "1px solid rgba(15,23,42,0.10)",
    borderRadius: 14,
    padding: "10px 12px",
    background: "white",
  },
  copyBtn: {
    padding: "8px 10px",
    borderRadius: 12,
    border: "1px solid rgba(15,23,42,0.12)",
    background: "white",
    cursor: "pointer",
    fontWeight: 900,
  },

  featureGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginTop: 12 },
  feature: { padding: 14, borderRadius: 14, background: "white", border: "1px solid rgba(15,23,42,0.10)" },
  featureTitle: { fontWeight: 950, marginBottom: 6 },
  featureText: { color: "#475467", lineHeight: 1.5, fontSize: 13 },

  footer: { marginTop: 18, padding: "10px 4px", color: "#667085", fontSize: 13 },
  footerLink: { color: "#0F172A", textDecoration: "none", fontWeight: 900 },
};




