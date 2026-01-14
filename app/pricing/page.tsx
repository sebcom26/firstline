export default function PricingPage() {
  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 16, fontFamily: "system-ui" }}>
      <h1>Pricing</h1>
      <p>
        FirstLine generates short, human-sounding first sentences for cold emails based on your inputs
        (role, company type, and context).
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginTop: 16 }}>
        <section style={{ border: "1px solid #eee", borderRadius: 14, padding: 16, background: "white" }}>
          <h2 style={{ marginTop: 0 }}>Free</h2>
          <p style={{ fontSize: 28, fontWeight: 800, margin: "6px 0" }}>$0</p>
          <p style={{ color: "#555" }}>Try the tool with limited usage.</p>

          <ul style={{ lineHeight: 1.7 }}>
            <li>Generate up to <b>1 set/day</b> of openers</li>
            <li><b>10 openers</b> per generation</li>
            <li>Copy-to-clipboard</li>
          </ul>
        </section>

        <section style={{ border: "1px solid #111", borderRadius: 14, padding: 16, background: "white" }}>
          <h2 style={{ marginTop: 0 }}>Pro</h2>
          <p style={{ fontSize: 28, fontWeight: 800, margin: "6px 0" }}>$9<span style={{ fontSize: 14, fontWeight: 700 }}>/month</span></p>
          <p style={{ color: "#555" }}>Unlimited access for daily outbound work.</p>

          <ul style={{ lineHeight: 1.7 }}>
            <li><b>Unlimited</b> generations</li>
            <li><b>10 openers</b> per generation</li>
            <li>All contexts (Hiring, Funding/Growth, LinkedIn, etc.)</li>
            <li>Cancel anytime</li>
          </ul>

          <p style={{ marginTop: 12, color: "#666", fontSize: 13 }}>
            Payments are processed by Paddle (Merchant of Record).
          </p>
        </section>
      </div>

      <h2 style={{ marginTop: 28 }}>What you receive</h2>
      <p>
        Each generation returns <b>10 one-sentence openers</b> (max ~20 words each), designed to be natural and non-spammy.
        You copy one line and paste it into your existing email template.
      </p>
    </main>
  );
}

