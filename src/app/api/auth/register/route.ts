import { NextResponse } from "next/server";

// Redireciona requisições de /api/auth/register para /api/register
export async function POST(request: Request) {
  try {
    // Clonar o corpo da requisição
    const body = await request.json();
    console.log("Redirecionando requisição com corpo:", JSON.stringify(body, null, 2));
    
    // Fazer uma requisição para a rota correta
    const response = await fetch(new URL('/api/register', request.url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    // Obter a resposta e retornar
    const data = await response.json();
    console.log("Resposta do redirecionamento:", response.status, JSON.stringify(data, null, 2));
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Erro no redirecionamento do registro:", error);
    return NextResponse.json(
      { 
        error: "Erro interno do servidor",
        message: error instanceof Error ? error.message : "Erro desconhecido"
      },
      { status: 500 }
    );
  }
} 