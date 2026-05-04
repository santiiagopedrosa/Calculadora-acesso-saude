import { useEffect, useState } from "react";
import { getInscriptions } from "../../utils/storage";

export default function Inscriptions(){
const [data, setData] = useState([]);

useEffect(() => {
    setData(getInscriptions());
}, []);

return (
    <div style={{ padding: "40px" }}>
        <h1>Inscrições</h1>

         <table border="1" cellPadding="10">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Mensagem</th>
                    <th>Data</th>
                </tr>
            </thead>

            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.message}</td>
                        <td>{new Date(item.date).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
         </table>
    </div>
);
}
