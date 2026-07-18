import { prisma } from "../lib/prisma";

async function testConnection() {
  console.log("⏳ Conectando a la base de datos de Hostinger...");
  try {
    // Intenta hacer una consulta simple
    const result = await prisma.$queryRaw`SELECT 1+1 AS result`;
    console.log("✅ ¡Conexión exitosa a la base de datos de Hostinger!");
    console.log("Resultado de consulta de prueba:", result);
  } catch (error) {
    console.error("❌ Error de conexión:");
    console.error(error);
    console.log("\n💡 CONSEJOS PARA RESOLVER ESTO EN HOSTINGER:");
    console.log("1. Ve al panel de Hostinger -> Base de datos -> MySQL Remoto.");
    console.log("2. En 'IP (deja en blanco para cualquiera)', ingresa '%' para permitir cualquier IP, o tu IP pública actual.");
    console.log("3. Haz clic en 'Crear'.");
    console.log("4. Confirma si el Host es realmente 'mysql.tsolutionsipidd.com' o si es la IP de tu sitio que se muestra en el panel de Hostinger.");
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
