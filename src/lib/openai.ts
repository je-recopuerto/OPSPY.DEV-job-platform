// Replace 'your-api-key' with your actual OpenAI API key
import { env } from "@/env.mjs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function improveBio(bio: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Improve this personal bio for a job site: \n\n"${bio}"`,
        },
      ],
      max_tokens: 150,
      model: "gpt-3.5-turbo",
    });

    console.log("completion:", completion);

    if (
      completion.choices &&
      completion.choices.length > 0 &&
      completion.choices[0].message &&
      completion.choices[0].message.content
    ) {
      return completion.choices[0].message.content.trim();
    } else {
      throw new Error("No response from OpenAI.");
    }
  } catch (error) {
    console.error("Error improving bio:", error);
    throw error;
  }
}
