export default function SettingsPage() {
  return (
    <div className="animate-in" style={{ maxWidth: "800px" }}>
      <div className="section-header" style={{ marginBottom: "var(--space-6)" }}>
        <div>
          <h1 className="section-title" style={{ fontSize: "2rem" }}>Configuración Corporativa</h1>
          <p style={{ color: "var(--rua-muted)", marginTop: "4px" }}>
            Ajustes de RUA y perfil de TSolutions IPIDD.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
        {/* Identidad */}
        <div className="rua-card">
          <h2 style={{ fontSize: "1.25rem", marginBottom: "var(--space-4)", color: "var(--rua-text)", borderBottom: "1px solid var(--rua-border)", paddingBottom: "12px" }}>Identidad de la IA</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", color: "var(--rua-muted)", marginBottom: "4px" }}>Nombre</label>
              <input type="text" defaultValue="RUA" disabled style={{ width: "100%", padding: "8px 12px", background: "var(--rua-surface-hover)", border: "1px solid var(--rua-border)", color: "var(--rua-text)", borderRadius: "6px" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", color: "var(--rua-muted)", marginBottom: "4px" }}>Rol</label>
              <input type="text" defaultValue="Co-fundador digital e IA Socio-Estratégica" disabled style={{ width: "100%", padding: "8px 12px", background: "var(--rua-surface-hover)", border: "1px solid var(--rua-border)", color: "var(--rua-text)", borderRadius: "6px" }} />
            </div>
          </div>
        </div>

        {/* Regla Suprema */}
        <div className="rua-card" style={{ border: "1px solid var(--rua-primary-dim)" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "var(--space-4)", color: "var(--rua-primary)", borderBottom: "1px solid var(--rua-border)", paddingBottom: "12px" }}>Reglas de Operación</h2>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", color: "var(--rua-muted)", marginBottom: "4px" }}>Regla Suprema de Co-Decisión (Activa)</label>
            <textarea 
              defaultValue="No se puede ejecutar, modificar, crear, eliminar, alterar ni programar ninguna acción operativa, administrativa, técnica o corporativa en el mundo real sin que Javier la revise, la apruebe y la firme digitalmente." 
              disabled 
              style={{ width: "100%", height: "80px", padding: "8px 12px", background: "var(--rua-surface-hover)", border: "1px solid var(--rua-border)", color: "var(--rua-text)", borderRadius: "6px", resize: "none" }} 
            />
          </div>
        </div>

        {/* Usuarios */}
        <div className="rua-card">
          <h2 style={{ fontSize: "1.25rem", marginBottom: "var(--space-4)", color: "var(--rua-text)", borderBottom: "1px solid var(--rua-border)", paddingBottom: "12px" }}>Usuarios y Permisos</h2>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "var(--rua-surface-hover)", borderRadius: "8px" }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--rua-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: "bold" }}>
                JG
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 500, color: "var(--rua-text)" }}>Javier Gallardo</p>
                <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--rua-muted)" }}>Super Admin (Firma Digital Autorizada)</p>
              </div>
            </div>
            <button className="btn btn-ghost" style={{ fontSize: "0.875rem" }}>Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
