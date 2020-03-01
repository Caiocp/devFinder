import React from "react";

import "./styles.css";

export default function DevItem({ user }) {
  return (
    <li className="dev-item">
      <header>
        <img src={user.avatar_url} alt={user.name} />
        <div className="user-info">
          <strong>{user.name}</strong>
          <span>{user.techs.join(", ")}</span>
        </div>
      </header>
      <p>{user.bio}</p>
      <a
        href={`https://github.com/${user.github_username}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        Acessar perfil do Github
      </a>
    </li>
  );
}
