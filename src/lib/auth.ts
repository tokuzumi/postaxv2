import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { loginSchema } from "@/lib/validations/user";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        // Validar campos com Zod
        const validatedFields = loginSchema.safeParse(credentials);
        
        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        try {
          // Buscar usuário no banco de dados
          const [users] = await db.query(
            "SELECT id, name, email, password FROM users WHERE email = ? LIMIT 1",
            [email]
          );
          
          const user = (users as any[])[0];

          if (!user || !user.password) {
            return null;
          }
          
          // Verificar senha
          const passwordMatch = await bcrypt.compare(password, user.password);
          
          if (!passwordMatch) {
            return null;
          }
          
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
}; 