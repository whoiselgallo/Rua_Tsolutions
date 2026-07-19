import Link from "next/link";

export default function StudioPage() {
  return (
    <div className="animate-in" style={{ padding: "var(--space-8)", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: "3rem", marginBottom: "var(--space-4)" }}>🎨</div>
      <h1 style={{ fontSize: "2rem", marginBottom: "var(--space-4)" }}>RUA Studio</h1>
      <p style={{ color: "var(--rua-muted)", marginBottom: "var(--space-6)" }}>
        El módulo Studio (Creador de Sitios Web Modulares y Sistema de Diseño) está programado para la <strong>Fase 4</strong> del desarrollo.
      </p>
      <Link href="/dashboard" className="btn btn-primary">
        Volver al Dashboard
      </Link>
    </div>
  );
}
