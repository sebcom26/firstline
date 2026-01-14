export default function TermsPage() {
  return (
    <main style={{ maxWidth: 800, margin: "40px auto", padding: 16, fontFamily: "system-ui" }}>
      <h1>Terms of Service</h1>

      <p>Last updated: {new Date().toISOString().slice(0, 10)}</p>

      <p>
        FirstLine is a web-based software service that provides AI-assisted text suggestions
        for writing cold email opening sentences.
      </p>

      <h2>Use of the Service</h2>
      <p>
        The service is provided “as is”. Generated content is for informational and productivity
        purposes only. Users are responsible for how they use the generated text.
      </p>

      <h2>Accounts & Payments</h2>
      <p>
        Some features require a paid subscription. Payments are processed by a third-party
        payment provider. We do not store payment information.
      </p>

      <h2>Acceptable Use</h2>
      <p>
        Users agree not to use the service for unlawful, harmful, or abusive purposes.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        We are not liable for any damages resulting from the use or inability to use the service.
      </p>

      <h2>Contact</h2>
      <p>
        For questions, please contact: support@firstline.app
      </p>
    </main>
  );
}
