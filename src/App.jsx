import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Termos from "./pages/Termos";
import Fontes from "./pages/Fontes";
import Contacto from "./pages/Contacto";
import Inscriptions from "./pages/admin/inscriptions"; 
import Sobre from "./pages/Sobre";
import Feedbacks from "./pages/admin/Feedbacks";
import Visitors from "./pages/admin/Visitors";
import Contact from "./pages/admin/Contact";
import Result from "./pages/Result";
import Calc1 from "./pages/Calc1";
import Calc2 from "./pages/Calc2";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/termos" element={<Termos />} />
      <Route path="/fontes" element={<Fontes />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/admin/inscriptions" element={<Inscriptions />} />
      <Route path="/admin/feedbacks" element={<Feedbacks />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/admin/visitors" element={<Visitors />} />
      <Route path="/admin/contacts" element={<Contact />} />
      <Route path="/resultado" element={<Result />} />
      <Route path="/calc1" element={<Calc1 />} />
      <Route path="/calc2" element={<Calc2 />} />
    </Routes>
  );
}

export default App;