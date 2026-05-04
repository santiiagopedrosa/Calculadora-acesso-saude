import MainLayout from "../layouts/MainLayout";
import Hero from "../components/Hero";
import ContactForm from "../features/contact/ContactForm";
import Calc1 from "./Calc1";

export default function Home() {
  return (
    <MainLayout>
      <Hero />


      <section style={{ padding: "60px 20px" }}>
  <h2>Simulação</h2>
  <Calc1 />
</section>
    </MainLayout>
  );
}