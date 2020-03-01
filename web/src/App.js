import React, { useState, useEffect } from "react";

import api from "./services/api";
import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await api.get("users");

      setUsers(response.data);
    }
    fetchUsers();
  }, []);

  async function handleSubmit(data) {
    const response = await api.post("/users", data);

    setUsers([...users, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleSubmit} />
      </aside>
      <main>
        <ul>
          {users.map(user => (
            <DevItem key={user._id} user={user} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
