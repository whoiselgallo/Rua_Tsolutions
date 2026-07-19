import Link from "next/link";

export default function ChatPage() {
  return (
    <div className="animate-in" style={{ padding: "var(--space-8)", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: "3rem", marginBottom: "var(--space-4)" }}>💬</div>
      <h1 style={{ fontSize: "2rem", marginBottom: "var(--space-4)" }}>Chat en Pantalla Completa</h1>
      <p style={{ color: "var(--rua-muted)", marginBottom: "var(--space-6)" }}>
        El Chat con RUA está integrado actualmente en el Dashboard Principal para mayor comodidad. 
        En la próxima fase, esta pantalla se convertirá en un entorno inmersivo para tareas más complejas.
      </p>
      <Link href="/dashboard" className="btn btn-primary">
        Ir al Chat del Dashboard
      </Link>
    </div>
  );
}
