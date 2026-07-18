import Link from "next/link";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="animate-in" style={{ padding: "var(--space-8)", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "var(--space-4)" }}>Proyecto: {params.id}</h1>
      <p style={{ color: "var(--rua-muted)", marginBottom: "var(--space-6)" }}>
        La vista de gestión integral de proyectos se implementará en la Fase 2.
      </p>
      <Link href="/dashboard" className="btn btn-primary">
        Volver al Dashboard
      </Link>
    </div>
  );
}
