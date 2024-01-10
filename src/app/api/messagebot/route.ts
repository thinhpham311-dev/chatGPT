import { NextResponse } from 'next/server';
import { OpenAI } from "openai";

const apiKey = process.env.OPENAI_API_KEY as string
const organization = process.env.OPENAI_ORGANIZATION as string

export async function GET(request: Request) {

    try {

        const openai = new OpenAI({
            apiKey,
            organization
        });
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "How are you?. Today." },
                { role: "user", content: "How are you?. Today." },
                { role: "assistant", content: "How are you?. Today." }
            ],
        });

        return NextResponse.json({ data: completion }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}