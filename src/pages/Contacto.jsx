import MainLayout from "../layouts/MainLayout";
import ContactForm from "../features/contact/ContactForm";

export default function Contacto() {
  return (
    <MainLayout>
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Contacto</h1>
        <ContactForm />
      </div>
    </MainLayout>
  );
}