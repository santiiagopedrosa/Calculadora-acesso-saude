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
      style={{
        padding: "100px 20px",
        textAlign: "center",
      }}
    >
      <h1>Bem-vindo ao nosso site</h1>
      <p>Descobre o propósito desta plataforma rapidamente</p>

      <Button onClick={() => scrollToSection("about")}>
        Saber mais
      </Button>
    </section>
  );
}