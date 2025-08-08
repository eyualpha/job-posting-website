import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import {PrismaAdapter} from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";


export const {signIn, signOut, auth, handlers} = NextAuth({
    session:{
        strategy: "jwt",
    },
    providers:[Github],
    adapter: PrismaAdapter(prisma),

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token
            }
            return token;
            

        },
        async session({ session, token }) {
            if (session) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
            }
            return session;
        }

        }
    });

