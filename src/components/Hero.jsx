import Button from "./ui/Button";

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="hero"
    >
      <h1>Sabes quando podes aceder ao SNS?</h1>
      <p>Simula o teu acesso ao Serviço Nacional de Saúde em segundos.</p>

      <Button onClick={() => scrollToSection("about")}>
        Saber mais
      </Button>
    </section>
  );
}