"use client";

import { useState } from "react";

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */
interface KPI {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendType: "up" | "warn" | "neutral";
  icon: string;
  emoji?: string;
  color: string;
  bg: string;
}

interface Proposal {
  id: string;
  title: string;
  type: string;
  status: "signed" | "pending" | "draft" | "blocked";
  date: string;
}

interface Project {
  id: string;
  name: string;
  type: string;
  emoji: string;
  progress: number;
  status: string;
  color: string;
}

interface ChatMessage {
  id: string;
  role: "rua" | "user";
  text: string;
}

/* ──────────────────────────────────────────────
   Static data (will come from DB in Phase 2)
   ────────────────────────────────────────────── */
const kpis: KPI[] = [
  {
    id: "active-projects",
    label: "Proyectos Activos",
    value: "5",
    trend: "↑ 5 APIs integradas",
    trendType: "up",
    icon: "📁",
    color: "var(--rua-primary)",
    bg: "var(--rua-primary-dim)",
  },
  {
    id: "pending-proposals",
    label: "Propuestas Pendientes",
    value: "2",
    trend: "⚠ Requieren tu firma",
    trendType: "warn",
    icon: "✍️",
    color: "var(--rua-warning)",
    bg: "var(--rua-warning-dim)",
  },
  {
    id: "spos",
    label: "SPOs al Día",
    value: "18/18",
    trend: "✓ Cumplimiento total",
    trendType: "up",
    icon: "📋",
    color: "var(--rua-accent)",
    bg: "var(--rua-accent-dim)",
  },
  {
    id: "alerts",
    label: "Alertas Críticas",
    value: "0",
    trend: "Todo en orden",
    trendType: "neutral",
    icon: "🛡️",
    color: "var(--rua-success)",
    bg: "var(--rua-success-dim)",
  },
];

const proposals: Proposal[] = [
  {
    id: "p1",
    title: "Arquitectura API — Diseño Web v2",
    type: "Técnica",
    status: "pending",
    date: "Hoy, 09:30",
  },
  {
    id: "p2",
    title: "Estrategia de Marca — Brand Identity Q3",
    type: "Estratégica",
    status: "pending",
    date: "Hoy, 08:15",
  },
  {
    id: "p3",
    title: "Optimización de Proceso — Ferrebot v1.2",
    type: "Operativa",
    status: "signed",
    date: "Ayer, 16:45",
  },
  {
    id: "p4",
    title: "Onboarding — La Cueva del Güero",
    type: "Cliente",
    status: "signed",
    date: "Ayer, 11:20",
  },
  {
    id: "p5",
    title: "Brief — Video Comercial Julio 2026",
    type: "Comercial",
    status: "draft",
    date: "15 jul, 14:00",
  },
];

const projects: Project[] = [
  {
    id: "diseno-web",
    name: "Diseño Web",
    type: "Servicio Digital",
    emoji: "🌐",
    progress: 68,
    status: "Activo",
    color: "#6C63FF",
  },
  {
    id: "brand-identity",
    name: "Brand Identity",
    type: "Identidad de Marca",
    emoji: "✨",
    progress: 73,
    status: "Activo",
    color: "#00D9B1",
  },
  {
    id: "cueva-guero",
    name: "La Cueva del Güero",
    type: "Proyecto Cliente",
    emoji: "🏠",
    progress: 45,
    status: "En Proceso",
    color: "#FFB547",
  },
  {
    id: "disenos-comerciales",
    name: "Diseños Comerciales",
    type: "Producción Video",
    emoji: "🎬",
    progress: 90,
    status: "Casi Listo",
    color: "#FF6B9D",
  },
  {
    id: "ferrebot",
    name: "Ferrebot",
    type: "Bot Administrativo",
    emoji: "🤖",
    progress: 55,
    status: "En Integración",
    color: "#4ECDC4",
  },
];

const initialMessages: ChatMessage[] = [
  {
    id: "m1",
    role: "rua",
    text: "Hola Javier 👋 Estoy al día con todos los proyectos. Tienes 2 propuestas esperando tu firma. ¿En qué te ayudo hoy?",
  },
];

/* ──────────────────────────────────────────────
   Status helpers
   ────────────────────────────────────────────── */
const statusLabel: Record<Proposal["status"], string> = {
  signed: "FIRMADO",
  pending: "PENDIENTE",
  draft: "BORRADOR",
  blocked: "BLOQUEADO",
};

const statusDotColor: Record<Proposal["status"], string> = {
  signed: "var(--rua-success)",
  pending: "var(--rua-warning)",
  draft: "var(--rua-muted)",
  blocked: "var(--rua-danger)",
};

/* ──────────────────────────────────────────────
   Dashboard Page
   ────────────────────────────────────────────── */
export default function DashboardPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  async function handleSend() {
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      
      const ruaMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "rua",
        text: data.reply || data.error || "No pude generar una respuesta. Intenta de nuevo.",
      };
      setMessages((prev) => [...prev, ruaMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "rua",
        text: "Error de conexión con el motor cognitivo de RUA.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Firma Banner */}
      <div className="firma-banner animate-in" role="alert" aria-live="polite">
        <span className="firma-icon" aria-hidden="true">✍️</span>
        <div className="firma-text">
          <strong>2 propuestas pendientes de firma.</strong> Ninguna acción será ejecutada sin tu aprobación. Revisa y firma en{" "}
          <a href="/proposals" style={{ color: "var(--rua-warning)", textDecoration: "underline" }}>Propuestas</a>.
        </div>
        <a href="/proposals" className="btn btn-ghost" id="btn-ver-propuestas" style={{ fontSize: "0.8125rem", padding: "6px 14px" }}>
          Ver ahora
        </a>
      </div>

      {/* KPI Grid */}
      <section aria-label="Indicadores clave" className="animate-in">
        <div className="section-header">
          <h2 className="section-title">Panel Ejecutivo</h2>
          <span className="rua-chip accent" style={{ fontSize: "0.7rem" }}>
            <span className="status-dot" style={{ width: 6, height: 6 }} />
            En tiempo real
          </span>
        </div>
        <div className="kpi-grid" style={{ marginBottom: "var(--space-6)" }}>
          {kpis.map((kpi, i) => (
            <div
              key={kpi.id}
              className={`kpi-card animate-in animate-in-delay-${i + 1}`}
              id={`kpi-${kpi.id}`}
              style={{ "--kpi-color": kpi.color, "--kpi-bg": kpi.bg } as React.CSSProperties}
              role="status"
              aria-label={`${kpi.label}: ${kpi.value}`}
            >
              <div className="kpi-icon" aria-hidden="true">{kpi.emoji ?? kpi.icon}</div>
              <div className="kpi-value">{kpi.value}</div>
              <div className="kpi-label">{kpi.label}</div>
              <div className={`kpi-trend ${kpi.trendType}`}>{kpi.trend}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Chat + Proposals */}
      <div className="dashboard-grid animate-in animate-in-delay-2" style={{ marginBottom: "var(--space-6)" }}>

        {/* Chat Widget */}
        <section className="rua-card" aria-label="Chat con RUA">
          <div className="section-header" style={{ marginBottom: "var(--space-4)" }}>
            <h2 className="section-title">Chat con RUA</h2>
            <span className="rua-chip accent" style={{ fontSize: "0.7rem" }}>
              <span className="status-dot" style={{ width: 6, height: 6 }} />
              En línea
            </span>
          </div>

          <div className="chat-widget">
            <div className="chat-messages" id="chat-messages" aria-live="polite" aria-label="Mensajes del chat">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-msg ${msg.role}`}>
                  <div className={`chat-avatar ${msg.role === "rua" ? "rua-ai" : "user-av"}`} aria-hidden="true">
                    {msg.role === "rua" ? "R" : "JG"}
                  </div>
                  <div className="chat-bubble">{msg.text}</div>
                </div>
              ))}
              {isTyping && (
                <div className="chat-msg rua">
                  <div className="chat-avatar rua-ai" aria-hidden="true">R</div>
                  <div className="chat-bubble" style={{ color: "var(--rua-muted)" }} aria-label="RUA está escribiendo">
                    <span style={{ letterSpacing: 2 }}>•••</span>
                  </div>
                </div>
              )}
            </div>

            <div className="chat-input-row">
              <input
                id="chat-input"
                className="chat-input"
                type="text"
                placeholder="Pregunta algo a RUA…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Escribir mensaje a RUA"
                autoComplete="off"
              />
              <button
                id="chat-send-btn"
                className="chat-send-btn"
                onClick={handleSend}
                disabled={!input.trim()}
                aria-label="Enviar mensaje"
                title="Enviar"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Proposals */}
        <section className="rua-card" aria-label="Propuestas recientes">
          <div className="section-header" style={{ marginBottom: "var(--space-4)" }}>
            <h2 className="section-title">Propuestas Recientes</h2>
            <a href="/proposals" className="btn btn-ghost" id="btn-all-proposals" style={{ fontSize: "0.8125rem", padding: "6px 14px" }}>
              Ver todas
            </a>
          </div>

          <div className="proposal-list" role="list" aria-label="Lista de propuestas">
            {proposals.map((p) => (
              <a key={p.id} href={`/proposals/${p.id}`} className="proposal-item" id={`proposal-${p.id}`} role="listitem">
                <span
                  className="proposal-dot"
                  style={{ background: statusDotColor[p.status] }}
                  aria-hidden="true"
                />
                <div className="proposal-info">
                  <div className="proposal-title">{p.title}</div>
                  <div className="proposal-meta">{p.type} · {p.date}</div>
                </div>
                <span className={`status-chip ${p.status}`} aria-label={`Estado: ${statusLabel[p.status]}`}>
                  {statusLabel[p.status]}
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* Projects Row */}
      <section aria-label="Proyectos activos">
        <div className="section-header">
          <h2 className="section-title">Proyectos Activos — TSolutions IPIDD</h2>
          <a href="/projects" className="btn btn-ghost" id="btn-all-projects" style={{ fontSize: "0.8125rem", padding: "6px 14px" }}>
            Gestionar
          </a>
        </div>

        <div className="projects-row">
          {projects.map((proj, i) => (
            <a
              key={proj.id}
              href={`/projects/${proj.id}`}
              className={`project-card animate-in animate-in-delay-${i + 1}`}
              id={`project-${proj.id}`}
              style={{ textDecoration: "none" }}
              aria-label={`Proyecto ${proj.name}: ${proj.progress}% completado`}
            >
              <div
                className="project-icon"
                style={{ background: `${proj.color}20` }}
                aria-hidden="true"
              >
                {proj.emoji}
              </div>
              <div className="project-name">{proj.name}</div>
              <div className="project-type">{proj.type}</div>
              <div className="progress-bar" role="progressbar" aria-valuenow={proj.progress} aria-valuemin={0} aria-valuemax={100}>
                <div
                  className="progress-fill"
                  style={{
                    width: `${proj.progress}%`,
                    background: `linear-gradient(90deg, ${proj.color} 0%, ${proj.color}99 100%)`,
                  }}
                />
              </div>
              <div className="progress-label">
                <span style={{ color: proj.color }}>{proj.status}</span>
                <span>{proj.progress}%</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}


