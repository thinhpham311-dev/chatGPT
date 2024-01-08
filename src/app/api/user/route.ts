import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: Request) {
    try {
        if (request.method !== "GET") {
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
        }
        const user = await prisma.conversation.findMany({
            orderBy: { createdAt: 'desc' },
        })
        return NextResponse.json({ data: user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json()
        if (request.method !== "POST") {
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
        }

        const saveUser = await prisma.user.create({
            data: {
                username: "thinhpham",
                email: "thinhpham67ag@gmail.com",
                image: "abc"
            }
        })
        return NextResponse.json({ data: saveUser }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

