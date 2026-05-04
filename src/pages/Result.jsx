import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/districts")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

  if (!state) {
    return (
      <div>
        <h2>Sem dados</h2>
        <button onClick={() => navigate("/")}>
          Voltar
        </button>
      </div>
    );
  }

  const { score_total, nivel, answers } = state;

  const selectedDistrict = districts.find(
    (d) => d.name === answers?.q_district
  );

  const getMessage = () => {
    if (nivel === "Baixo") {
      return "O seu nível de acesso à saúde é reduzido.";
    }
    if (nivel === "Médio") {
      return "O seu nível de acesso é moderado.";
    }
  
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>Resultado</h1>

      <h2>Score: {score_total}</h2>
      <h3>Nível: {nivel}</h3>

      {/* 🔥 NOVO */}
      {selectedDistrict && (
        <>
          <h3>Distrito: {selectedDistrict.name}</h3>
          <p>Tempo de espera: {selectedDistrict.waitTime} min</p>
          <p>Score acesso: {selectedDistrict.score}</p>
        </>
      )}

      

      <button onClick={() => navigate("/")}>
        Fazer novamente
      </button>
    </div>
  );
}