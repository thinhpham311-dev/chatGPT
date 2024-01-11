import { NextResponse } from 'next/server';
import { OpenAI } from "openai";

const apiKey = process.env.OPENAI_API_KEY as string
const organization = process.env.OPENAI_ORGANIZATION as string

export async function POST(request: Request) {

    try {
        const data = await request.json()
        const openai = new OpenAI({
            apiKey,
            organization
        });
        if (request.method !== "POST") {
            return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
        }
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", ...data },
                { role: "user", ...data },
                { role: "assistant", ...data }
            ],
        });

        return NextResponse.json({ data: completion }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}