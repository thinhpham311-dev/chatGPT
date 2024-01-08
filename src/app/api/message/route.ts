import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: Request) {
    try {
        if (request.method !== "GET") {
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
        }
        const messages = await prisma.message.findMany({
            where: {
                id: 1,
            }
        })
        return NextResponse.json({ data: messages }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {

        if (request.method !== "POST") {
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
        }

        // const messageData = JSON.parse()

        const saveMessage = await prisma.message.create({
            data: {
                content: "abc",
                userId: 1
            }
        })

        return NextResponse.json({ data: saveMessage }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

