export default function GermanHomePage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#f8f6f3",
      color: "#101827",
      fontFamily: "Arial, sans-serif",
      padding: "80px 24px"
    }}>
      <section style={{
        maxWidth: "1100px",
        margin: "0 auto",
        background: "#ffffff",
        border: "1px solid #e6e2dc",
        borderRadius: "28px",
        padding: "64px",
        boxShadow: "0 24px 80px rgba(16,24,39,0.08)"
      }}>
        <p style={{
          color: "#c63d4d",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "20px"
        }}>
          Veonis · Schweiz
        </p>

        <h1 style={{
          fontSize: "56px",
          lineHeight: "1.05",
          maxWidth: "780px",
          marginBottom: "24px"
        }}>
          Ein Ansprechpartner für Ihre Finanzen.
        </h1>

        <p style={{
          fontSize: "20px",
          lineHeight: "1.7",
          color: "#555",
          maxWidth: "760px",
          marginBottom: "36px"
        }}>
          Veonis begleitet Privat- und Firmenkunden in der Schweiz bei Versicherungen,
          Vorsorge, Hypotheken, Steuern und Anlagen – persönlich, verständlich und ganzheitlich.
        </p>

        <a href="/de/kontakt" style={{
          display: "inline-block",
          background: "#c63d4d",
          color: "#fff",
          padding: "16px 26px",
          borderRadius: "999px",
          textDecoration: "none",
          fontWeight: 700
        }}>
          Kostenloses Erstgespräch vereinbaren
        </a>
      </section>
    </main>
  );
}
