import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Forzamos el renderizado dinámico para tener datos frescos
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function ProposalsPage() {
  let proposals: any[] = [];
  let dbError = false;

  try {
    proposals = await prisma.proposal.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    dbError = true;
    // Datos de fallback
    proposals = [
      { id: "p1", title: "Arquitectura API — Diseño Web v2", type: "Técnica", status: "PENDING", createdAt: new Date().toISOString(), description: "Integración de la nueva API REST." },
      { id: "p2", title: "Estrategia de Marca — Q3", type: "Estratégica", status: "SIGNED", createdAt: new Date(Date.now() - 86400000).toISOString(), description: "Aprobación de la nueva paleta." }
    ];
  }

  return (
    <div className="animate-in">
      <div className="section-header" style={{ marginBottom: "var(--space-6)" }}>
        <div>
          <h1 className="section-title" style={{ fontSize: "2rem" }}>Gestión de Propuestas</h1>
          <p style={{ color: "var(--rua-muted)", marginTop: "4px" }}>
            Regla Suprema de Co-Decisión: Revisa y firma las acciones propuestas por RUA.
          </p>
        </div>
        <button className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>+</span> Nueva Propuesta
        </button>
      </div>

      {dbError && (
        <div className="rua-chip warning" style={{ marginBottom: "var(--space-4)", display: "inline-flex" }}>
          ⚠️ Mostrando datos de prueba (Sin conexión a Hostinger)
        </div>
      )}

      <div className="rua-card">
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--rua-border)", color: "var(--rua-muted)", fontSize: "0.875rem" }}>
              <th style={{ padding: "var(--space-3) var(--space-4)", fontWeight: 500 }}>Título</th>
              <th style={{ padding: "var(--space-3) var(--space-4)", fontWeight: 500 }}>Tipo</th>
              <th style={{ padding: "var(--space-3) var(--space-4)", fontWeight: 500 }}>Fecha</th>
              <th style={{ padding: "var(--space-3) var(--space-4)", fontWeight: 500 }}>Estado</th>
              <th style={{ padding: "var(--space-3) var(--space-4)", fontWeight: 500 }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {proposals.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "var(--space-6)", textAlign: "center", color: "var(--rua-muted)" }}>
                  No hay propuestas registradas.
                </td>
              </tr>
            ) : (
              proposals.map((p: any) => (
                <tr key={p.id} style={{ borderBottom: "1px solid var(--rua-border)", transition: "background 0.2s" }} className="hover-row">
                  <td style={{ padding: "var(--space-4)", fontWeight: 500, color: "var(--rua-text)" }}>{p.title}</td>
                  <td style={{ padding: "var(--space-4)", color: "var(--rua-muted)", fontSize: "0.875rem" }}>{p.type}</td>
                  <td style={{ padding: "var(--space-4)", color: "var(--rua-muted)", fontSize: "0.875rem" }}>
                    {format(new Date(p.createdAt), "dd MMM yyyy, HH:mm", { locale: es })}
                  </td>
                  <td style={{ padding: "var(--space-4)" }}>
                    <span className={`status-chip ${p.status.toLowerCase()}`}>
                      {p.status === "SIGNED" ? "FIRMADO" : p.status === "PENDING" ? "PENDIENTE" : p.status}
                    </span>
                  </td>
                  <td style={{ padding: "var(--space-4)" }}>
                    <Link href={`/proposals/${p.id}`} className="btn btn-ghost" style={{ fontSize: "0.8125rem", padding: "6px 12px" }}>
                      {p.status === "PENDING" ? "Revisar y Firmar" : "Ver Detalle"}
                    </Link>
                  </td>
                </tr>
              ))
            )}
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
