import Link from "next/link";

export default function IntegrationsPage() {
  const integrations = [
    { id: "1", name: "Dify API", description: "Cerebro conversacional de RUA", status: "Conectado", icon: "🧠" },
    { id: "2", name: "OpenAI", description: "Modelos base (GPT-4o)", status: "Requiere Pago", icon: "⚡" },
    { id: "3", name: "Neon DB", description: "Base de datos PostgreSQL", status: "Conectado", icon: "🗄️" },
    { id: "4", name: "WhatsApp Business", description: "API de mensajería (Ferrebot)", status: "Desconectado", icon: "📱" },
  ];

  return (
    <div className="animate-in">
      <div className="section-header" style={{ marginBottom: "var(--space-6)" }}>
        <div>
          <h1 className="section-title" style={{ fontSize: "2rem" }}>Integraciones</h1>
          <p style={{ color: "var(--rua-muted)", marginTop: "4px" }}>
            Conexiones de RUA con plataformas externas y APIs.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "var(--space-4)" }}>
        {integrations.map((int) => (
          <div key={int.id} className="rua-card hover-card" style={{ display: "flex", gap: "var(--space-4)", alignItems: "center" }}>
            <div style={{ fontSize: "2rem", background: "var(--rua-surface-hover)", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px" }}>
              {int.icon}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: "1.125rem", margin: "0 0 4px 0" }}>{int.name}</h3>
              <p style={{ color: "var(--rua-muted)", fontSize: "0.875rem", margin: "0 0 8px 0" }}>{int.description}</p>
              <span className={`status-chip`} style={{ 
                fontSize: "0.75rem", 
                border: "1px solid", 
                borderColor: int.status === "Conectado" ? "var(--rua-primary)" : int.status === "Requiere Pago" ? "#F59E0B" : "var(--rua-border)",
                color: int.status === "Conectado" ? "var(--rua-primary)" : int.status === "Requiere Pago" ? "#F59E0B" : "var(--rua-muted)",
              }}>
                {int.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .hover-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hover-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
      `}</style>
    </div>
  );
}
