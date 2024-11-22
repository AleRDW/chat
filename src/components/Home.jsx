import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setData(data.slice(0, 100)));
  }, []);

  return (
    <div className="card-api">
      <div className="box-api">
        <h1 className="title">Bienvenidos a la App</h1>
        <p className="text">Esta es una aplicación React con un chat y consumo de APIs.</p>
        <h2 className="subtitle">Datos de la API:</h2>
        <ul className="list">
          {data.map((item) => (
            <li key={item.id} className="number">
              <strong>{item.title}</strong>: {item.body}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
