import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { db } from "@/lib/db";
import { registerSchema } from "@/lib/validations/user";

// Rota de redirecionamento agora com implementação direta
export async function POST(request: Request) {
  try {
    console.log("Rota /api/auth/register - Iniciando processamento direto");
    const body = await request.json();
    
    console.log("Corpo da requisição recebido:", JSON.stringify(body, null, 2));
    
    // Validar dados com Zod
    const validatedFields = registerSchema.safeParse(body);
    
    if (!validatedFields.success) {
      console.log("Erros de validação:", JSON.stringify(validatedFields.error.issues, null, 2));
      return NextResponse.json(
        { 
          error: "Dados inválidos", 
          issues: validatedFields.error.issues,
          message: validatedFields.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ')
        }, 
        { status: 400 }
      );
    }
    
    const { 
      name, 
      email, 
      password, 
      whatsapp_country_code, 
      whatsapp_ddd, 
      whatsapp_number 
    } = validatedFields.data;
    
    console.log("Verificando se email já está em uso:", email);
    
    try {
      // Verificar se o email já está em uso
      const [existingUsers] = await db.query(
        "SELECT id FROM users WHERE email = ?",
        [email]
      );
      
      console.log("Resultados da verificação de email:", existingUsers);
      
      if ((existingUsers as any[]).length > 0) {
        console.log("Email já registrado:", email);
        return NextResponse.json(
          { error: "Este email já está em uso" },
          { status: 409 }
        );
      }
    } catch (dbError) {
      console.error("Erro na consulta ao banco de dados:", dbError);
      return NextResponse.json(
        { error: "Erro ao verificar disponibilidade do email", message: (dbError as Error).message },
        { status: 500 }
      );
    }
    
    // Hash da senha
    console.log("Aplicando hash na senha");
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Criar usuário no banco de dados
    const whatsapp = `${whatsapp_country_code}${whatsapp_ddd}${whatsapp_number}`;
    console.log("Preparando para inserir usuário. WhatsApp:", whatsapp);
    
    try {
      await db.query(
        `INSERT INTO users (
          name, 
          email, 
          password, 
          whatsapp,
          created_at
        ) VALUES (?, ?, ?, ?, NOW())`,
        [
          name,
          email,
          hashedPassword,
          whatsapp
        ]
      );
      
      console.log("Usuário inserido com sucesso:", email);
      
      return NextResponse.json(
        { success: true, message: "Usuário registrado com sucesso" },
        { status: 201 }
      );
    } catch (insertError) {
      console.error("Erro ao inserir usuário:", insertError);
      return NextResponse.json(
        { error: "Falha ao criar usuário", message: (insertError as Error).message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erro geral no registro:", error);
    return NextResponse.json(
      { 
        error: "Erro interno do servidor",
        message: error instanceof Error ? error.message : "Erro desconhecido"
      },
      { status: 500 }
    );
  }
} 