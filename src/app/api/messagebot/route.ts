import { NextResponse } from 'next/server';
import { OpenAI } from "openai";
import { currentUser } from '@clerk/nextjs';
const apiKey = process.env.OPENAI_API_KEY as string
const organization = process.env.OPENAI_ORGANIZATION as string

export async function POST(request: Request) {
    const user = currentUser();
    try {
        const openai = new OpenAI({
            apiKey,
            organization
        });
        const data = await request.json()

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (request.method !== "POST") {
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
        }
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: data.content },
                { role: "user", content: data.content },
                { role: "assistant", content: data.content }
            ],
        });

        return NextResponse.json({ data: completion.choices[0].message.content }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}