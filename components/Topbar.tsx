"use client";

import { useEffect, useState } from "react";

const bellIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const moonIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 19) return "Buenas tardes";
  return "Buenas noches";
}

function getFormattedDate() {
  return new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

interface TopbarProps {
  pendingCount?: number;
}

export default function Topbar({ pendingCount = 0 }: TopbarProps) {
  const [greeting, setGreeting] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setGreeting(getGreeting());
    setDate(getFormattedDate());
  }, []);

  return (
    <header className="rua-topbar" role="banner">
      {/* Greeting */}
      <div className="topbar-greeting">
        <h1 id="topbar-greeting">
          {greeting}, <span style={{ background: "var(--rua-gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Javier</span>
        </h1>
        <span className="topbar-date" aria-label="Fecha actual">{date}</span>
      </div>

      {/* Actions */}
      <div className="topbar-actions">
        {/* RUA version chip */}
        <div className="rua-chip" aria-label="Versión de RUA">
          <span className="status-dot" aria-hidden="true" style={{ width: 7, height: 7 }} />
          RUA v1.0
        </div>

        {/* Firma pendiente chip */}
        {pendingCount > 0 && (
          <div className="rua-chip warning" aria-label={`${pendingCount} propuesta(s) pendiente(s) de firma`}>
            ✍️ {pendingCount} pendiente{pendingCount > 1 ? "s" : ""}
          </div>
        )}

        {/* Notifications */}
        <button
          className="icon-btn"
          id="btn-notifications"
          aria-label="Ver notificaciones"
          title="Notificaciones"
        >
          {bellIcon}
          {pendingCount > 0 && (
            <span className="badge" aria-hidden="true">{pendingCount}</span>
          )}
        </button>

        {/* Theme placeholder */}
        <button
          className="icon-btn"
          id="btn-theme"
          aria-label="Modo oscuro activo"
          title="Tema"
        >
          {moonIcon}
        </button>
      </div>
    </header>
  );
}
