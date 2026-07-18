import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function MemoryPage() {
  const logs = [
    { id: "1", action: "FIRMA: PROPUESTA APROBADA", proposal: "Arquitectura API — Diseño Web v2", date: new Date().toISOString(), user: "Javier Gallardo", hash: "0x3f2a...8c91" },
    { id: "2", action: "FIRMA: ONBOARDING COMPLETADO", proposal: "Ferrebot Cliente #004", date: new Date(Date.now() - 86400000).toISOString(), user: "Javier Gallardo", hash: "0x7b1c...2a4f" },
    { id: "3", action: "RUA: ALERTA DE SEGURIDAD", proposal: "Intento de login fallido", date: new Date(Date.now() - 172800000).toISOString(), user: "RUA Core", hash: "0x9d4e...1b5c" },
  ];

  return (
    <div className="animate-in">
      <div className="section-header" style={{ marginBottom: "var(--space-6)" }}>
        <div>
          <h1 className="section-title" style={{ fontSize: "2rem" }}>Memoria (DecisionLog)</h1>
          <p style={{ color: "var(--rua-muted)", marginTop: "4px" }}>
            Bitácora inmutable de todas las decisiones corporativas y acciones estratégicas de RUA.
          </p>
        </div>
      </div>

      <div className="rua-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--rua-border)", color: "var(--rua-muted)", fontSize: "0.875rem", backgroundColor: "var(--rua-surface-hover)" }}>
              <th style={{ padding: "var(--space-3) var(--space-4)", fontWeight: 500 }}>Fecha / Hora</th>
              <th style={{ padding: "var(--space-3) var(--space-4)", fontWeight: 500 }}>Acción (Log)</th>
              <th style={{ padding: "var(--space-3) var(--space-4)", fontWeight: 500 }}>Referencia</th>
              <th style={{ padding: "var(--space-3) var(--space-4)", fontWeight: 500 }}>Actor</th>
              <th style={{ padding: "var(--space-3) var(--space-4)", fontWeight: 500 }}>Hash</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} style={{ borderBottom: "1px solid var(--rua-border)" }} className="hover-row">
                <td style={{ padding: "var(--space-3) var(--space-4)", color: "var(--rua-text)", fontSize: "0.875rem", whiteSpace: "nowrap" }}>
                  {format(new Date(log.date), "dd MMM yyyy, HH:mm", { locale: es })}
                </td>
                <td style={{ padding: "var(--space-3) var(--space-4)", color: log.action.includes("FIRMA") ? "var(--rua-primary)" : "var(--rua-text)", fontWeight: 500, fontSize: "0.875rem" }}>
                  {log.action}
                </td>
                <td style={{ padding: "var(--space-3) var(--space-4)", color: "var(--rua-muted)", fontSize: "0.875rem" }}>
                  {log.proposal}
                </td>
                <td style={{ padding: "var(--space-3) var(--space-4)", color: "var(--rua-text)", fontSize: "0.875rem" }}>
                  {log.user}
                </td>
                <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                  <code style={{ fontSize: "0.75rem", color: "var(--rua-muted)", background: "var(--rua-surface-hover)", padding: "2px 6px", borderRadius: "4px" }}>
                    {log.hash}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .hover-row:hover {
          background-color: var(--rua-surface-hover);
        }
      `}</style>
    </div>
  );
}
