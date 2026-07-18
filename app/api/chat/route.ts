import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: "Mensaje vacío" }, { status: 400 });
    }

    // Si el usuario provee un prompt ID específico, usamos la nueva API de Responses mediante fetch
    if (process.env.OPENAI_PROMPT_ID) {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          input: message,
          tools: [], // Deshabilitar herramientas (como DALL-E) que causan conflicto sin streaming
          prompt: {
            id: process.env.OPENAI_PROMPT_ID,
            version: process.env.OPENAI_PROMPT_VERSION || "2",
          },
        }),
      });

      if (!response.ok) {
        const errData = await response.text();
        console.error("OpenAI Fetch Error:", errData);
        // Si el endpoint de responses falla (ej. si no está activo), caemos al bloque catch
        throw new Error(`OpenAI API falló con status ${response.status}: ${errData}`);
      }

      const data = await response.json();
      return NextResponse.json({ 
        reply: data.output_text || data.choices?.[0]?.message?.content || "Respuesta generada por RUA" 
      });
    }

    // Fallback al chat estándar si no hay prompt ID
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // modelo de producción estándar
      messages: [
        { role: "system", content: "Eres RUA, el co-fundador digital e Inteligencia Artificial Socio-Estratégica de TSolutions IPIDD. Tu socio principal es Javier Gallardo. Regla Suprema de Co-Decisión: No puedes modificar, crear, eliminar, alterar ni programar ninguna acción operativa o administrativa real sin que Javier Gallardo la revise, la apruebe y firme digitalmente la propuesta generada." },
        { role: "user", content: message }
      ],
      temperature: 0.2,
    });

    return NextResponse.json({ reply: completion.choices[0]?.message?.content || "Entendido, procedo a analizar." });
  } catch (error: any) {
    console.error("OpenAI Error:", error);
    return NextResponse.json(
      { error: `Error RUA Core: ${error.message}` },
      { status: 500 }
    );
  }
}
