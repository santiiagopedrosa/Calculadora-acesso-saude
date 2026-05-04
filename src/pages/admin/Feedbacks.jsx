import  { useEffect, useState } from "react";
import { getFeedbacks } from "../../utils/storage";

export default function Feedbacks(){

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(getFeedbacks());
    }, []);

    return (
        <div style={{ padding: "40px" }}>
            <h1>Feedbacks</h1>
            <ul>
                {data.map((item,index) => (
                    <li key={index}>
                        {item.message} - {new Date(item.date).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    )
}