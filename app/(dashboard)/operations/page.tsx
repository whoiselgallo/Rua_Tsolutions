import Link from "next/link";

export default function OperationsPage() {
  const operations = [
    { id: "1", name: "Auditoría de API", type: "Técnica", frequency: "Semanal", lastRun: "Hace 2 días", status: "OK" },
    { id: "2", name: "Reporte de Ventas", type: "Financiera", frequency: "Mensual", lastRun: "Hace 15 días", status: "PENDIENTE" },
    { id: "3", name: "Revisión de Seguridad", type: "Seguridad", frequency: "Quincenal", lastRun: "Hoy", status: "ALERTA" },
  ];

  return (
    <div className="animate-in">
      <div className="section-header" style={{ marginBottom: "var(--space-6)" }}>
        <div>
          <h1 className="section-title" style={{ fontSize: "2rem" }}>Operaciones (SPOs)</h1>
          <p style={{ color: "var(--rua-muted)", marginTop: "4px" }}>
            Procedimientos Operativos Estándar y automatizaciones administrativas.
          </p>
        </div>
        <button className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>+</span> Crear SPO
        </button>
      </div>

      <div className="rua-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--rua-border)", color: "var(--rua-muted)", fontSize: "0.875rem", backgroundColor: "var(--rua-surface-hover)" }}>
              <th style={{ padding: "var(--space-3) var(--space-4)", fontWeight: 500 }}>Nombre del Proceso</th>
              <th style={{ padding: "var(--space-3) var(--space-4)", fontWeight: 500 }}>Área</th>
              <th style={{ padding: "var(--space-3) var(--space-4)", fontWeight: 500 }}>Frecuencia</th>
              <th style={{ padding: "var(--space-3) var(--space-4)", fontWeight: 500 }}>Última Ejecución</th>
              <th style={{ padding: "var(--space-3) var(--space-4)", fontWeight: 500 }}>Estado</th>
              <th style={{ padding: "var(--space-3) var(--space-4)", fontWeight: 500 }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((op) => (
              <tr key={op.id} style={{ borderBottom: "1px solid var(--rua-border)" }} className="hover-row">
                <td style={{ padding: "var(--space-4)", color: "var(--rua-text)", fontWeight: 500 }}>{op.name}</td>
                <td style={{ padding: "var(--space-4)", color: "var(--rua-muted)", fontSize: "0.875rem" }}>{op.type}</td>
                <td style={{ padding: "var(--space-4)", color: "var(--rua-text)", fontSize: "0.875rem" }}>{op.frequency}</td>
                <td style={{ padding: "var(--space-4)", color: "var(--rua-muted)", fontSize: "0.875rem" }}>{op.lastRun}</td>
                <td style={{ padding: "var(--space-4)" }}>
                  <span className={`status-chip ${op.status === "OK" ? "signed" : op.status === "PENDIENTE" ? "pending" : "blocked"}`}>
                    {op.status}
                  </span>
                </td>
                <td style={{ padding: "var(--space-4)" }}>
                  <button className="btn btn-ghost" style={{ padding: "4px 8px", fontSize: "0.8125rem" }}>Ejecutar ahora</button>
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
