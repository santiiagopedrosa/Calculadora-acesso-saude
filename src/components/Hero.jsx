import Button from "./ui/Button";

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />

      <span className="hero-badge">✦ Gratuito · 2 minutos</span>
      <h1>Sabes quando podes<br />aceder ao SNS?</h1>
      <p>Simula o teu acesso ao Serviço Nacional de Saúde em segundos.</p>

      <Button className="hero-cta" onClick={() => scrollToSection("simulacao")}>
        Começar simulação →
      </Button>
    </section>
  );
}