import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { db } from "@/lib/db";
import { registerSchema } from "@/lib/validations/user";

export async function POST(request: Request) {
  try {
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
    
    // Verificar se o email já está em uso
    const [existingUsers] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    
    if ((existingUsers as any[]).length > 0) {
      return NextResponse.json(
        { error: "Este email já está em uso" },
        { status: 409 }
      );
    }
    
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Criar usuário no banco de dados
    const whatsapp = `${whatsapp_country_code}${whatsapp_ddd}${whatsapp_number}`;
    
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
    
    return NextResponse.json(
      { success: true, message: "Usuário registrado com sucesso" },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Erro no registro:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
} 