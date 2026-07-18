import Link from "next/link";

export default function ProjectsPage() {
  const projects = [
    { id: "1", name: "La Cueva del Güero", type: "Plataforma IA", status: "Activo", progress: 75, color: "#F59E0B" },
    { id: "2", name: "Ferrebot", type: "Bot WhatsApp", status: "Mantenimiento", progress: 100, color: "#10B981" },
    { id: "3", name: "TSolutions Landing", type: "Web Corporativa", status: "En Desarrollo", progress: 30, color: "#3B82F6" },
  ];

  return (
    <div className="animate-in">
      <div className="section-header" style={{ marginBottom: "var(--space-6)" }}>
        <div>
          <h1 className="section-title" style={{ fontSize: "2rem" }}>Gestor de Proyectos</h1>
          <p style={{ color: "var(--rua-muted)", marginTop: "4px" }}>
            Control y seguimiento de todas las iniciativas digitales de TSolutions IPIDD.
          </p>
        </div>
        <button className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>+</span> Nuevo Proyecto
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "var(--space-4)" }}>
        {projects.map((project) => (
          <div key={project.id} className="rua-card hover-card" style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: project.color }}></div>
                <h3 style={{ fontSize: "1.125rem", margin: 0 }}>{project.name}</h3>
              </div>
            </div>
            
            <p style={{ color: "var(--rua-muted)", fontSize: "0.875rem", margin: 0 }}>
              {project.type}
            </p>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--rua-muted)", marginBottom: "4px" }}>
                <span>Progreso</span>
                <span>{project.progress}%</span>
              </div>
              <div style={{ width: "100%", height: "6px", backgroundColor: "var(--rua-surface-hover)", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ width: `${project.progress}%`, height: "100%", backgroundColor: project.color, borderRadius: "999px" }}></div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "var(--space-4)", borderTop: "1px solid var(--rua-border)" }}>
              <span className={`status-chip`} style={{ fontSize: "0.75rem", border: `1px solid ${project.color}33`, color: project.color, background: `${project.color}11` }}>
                {project.status}
              </span>
              <Link href={`/projects/${project.id}`} className="btn btn-ghost" style={{ fontSize: "0.875rem", padding: "4px 8px" }}>
                Ver Detalles
              </Link>
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
