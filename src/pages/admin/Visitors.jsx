import { useEffect, useState } from "react";
import { getVisitors } from "../../utils/storage";

export default function Visitors() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getVisitors());
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Visitors</h1>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Score</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {data.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.score}</td>
              <td>{v.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}