import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5173/transactions";

function App() {
  const [text, setText] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const response = await axios.get(API_URL);
    setTransactions(response.data);
  };

  const addTransaction = async () => {
    if (!text.trim()) return;
    const response = await axios.post(API_URL, { text });
    setTransactions([...transactions, response.data]);
    setText("");
  };

  const deleteTransaction = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTransactions(transactions.filter((t) => t._id !== id));
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Text Transaction Tool</h2>
      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTransaction}>Add</button>
      <ul>
        {transactions.map((t) => (
          <li key={t._id}>
            {t.text}{" "}
            <button onClick={() => deleteTransaction(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;





















