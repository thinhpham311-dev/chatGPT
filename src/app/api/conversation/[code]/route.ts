import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { code: string } }) {
    const code = params.code
    try {

        if (request.method !== "GET") {
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
        }
        const idConversations = await prisma.conversation.findFirst({
            where: { code },
            select: {
                id: true
            }
        })
        return NextResponse.json({ data: idConversations }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}