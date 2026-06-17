export default function EnglishHomePage() {
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
        <p style={{ color: "#c63d4d", fontWeight: 700 }}>
          Veonis · Switzerland
        </p>
        <h1 style={{ fontSize: "56px", lineHeight: "1.05", maxWidth: "780px" }}>
          One contact for your finances.
        </h1>
        <p style={{ fontSize: "20px", lineHeight: "1.7", color: "#555", maxWidth: "760px" }}>
          Veonis supports private and corporate clients in Switzerland with insurance,
          pension planning, mortgages, taxes and investments.
        </p>
      </section>
    </main>
  );
}
