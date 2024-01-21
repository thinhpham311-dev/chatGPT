import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';
import { OpenAI } from "openai";
const apiKey = process.env.OPENAI_API_KEY as string
const organization = process.env.OPENAI_ORGANIZATION as string
const prisma = new PrismaClient()


export async function POST(request: Request) {
    const user = currentUser();
    try {
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const openai = new OpenAI({
            apiKey,
            organization
        });
        const data = await request.json()

        if (request.method !== "POST") {
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: data.content },
            ],
        });
        const contentbot = await completion.choices[0].message.content


        const saveMessage = await prisma.message.create({
            data: {
                content: contentbot,
                userId: data.userId,
                isbot: data.isbot,
                conversationCode: data.conversationCode
            }
        })

        return NextResponse.json({ data: saveMessage }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

