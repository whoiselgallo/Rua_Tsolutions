import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, conversationId } = body;

    if (!message) {
      return NextResponse.json({ error: "Mensaje vacío" }, { status: 400 });
    }

    const difyApiKey = process.env.DIFY_API_KEY;
    if (!difyApiKey) {
      return NextResponse.json({ error: "DIFY_API_KEY no configurada en Vercel" }, { status: 500 });
    }

    const difyUrl = process.env.DIFY_API_URL || "https://api.dify.ai/v1/chat-messages";

    const response = await fetch(difyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${difyApiKey}`,
      },
      body: JSON.stringify({
        inputs: {},
        query: message,
        response_mode: "blocking",
        conversation_id: conversationId || "",
        user: "javier_gallardo",
      }),
    });

    if (!response.ok) {
      const errData = await response.text();
      console.error("Dify Fetch Error:", errData);
      throw new Error(`Dify API falló con status ${response.status}: ${errData}`);
    }

    const data = await response.json();
    
    // Dify devuelve la respuesta en la propiedad 'answer' y el ID de memoria en 'conversation_id'
    return NextResponse.json({ 
      reply: data.answer || "Respuesta recibida pero sin contenido.",
      conversationId: data.conversation_id
    });

  } catch (error: any) {
    console.error("Dify Error:", error);
    return NextResponse.json(
      { error: `Error RUA Core (Dify): ${error.message}` },
      { status: 500 }
    );
  }
}
