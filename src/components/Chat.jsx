import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, query, onSnapshot, orderBy } from "firebase/firestore";
import "./Chat.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState(""); // Estado para el nombre del usuario
  const messagesEndRef = useRef(null); // Referencia para el scroll automático

  // Cargar mensajes desde Firebase
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  // Función para enviar un mensaje
  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "" || username.trim() === "") return; // Validar que el nombre y el mensaje no estén vacíos

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      name: username,
      timestamp: Date.now(),
    });

    setNewMessage(""); // Limpiar el input después de enviar
  };

  // Función para hacer scroll automático al final del chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="card-form">
      <div className="box-title">
        <h2 className="title">Chat Comunitario</h2>
      <form
        className="input-name"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Ingresa tu nombre..."
          className="box-name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </form>
      </div>

      <div className="messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.name === username ? "right" : "left"}`}
          >
            <strong>{msg.name}</strong>
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef}>

        </div>
      </div>

      <form onSubmit={sendMessage} className="box-layout-two">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          className="input-message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="btn-submit">Enviar</button>
      </form>
    </div>
  );
}

export default Chat;
