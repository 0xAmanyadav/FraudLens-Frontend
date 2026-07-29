import { ApiError } from "../utils/ApiError.js";
import { getUrlScannerPrompt } from "../prompt/promptUrl.js";
import { z } from "zod";
import { openRouterClient } from "../config/openRouter.js";


// Validate URL format
function isValidUrl(url) {
    try {
        const parsed = new URL(url);
        return ["http:", "https:"].includes(parsed.protocol);
    } catch {
        return false;
    }
}


// AI response validation schema
const urlThreatSchema = z.object({
    overallStatus: z.enum([
        "Safe",
        "Low Risk",
        "Medium Risk",
        "High Risk",
        "Critical",
    ]),

    riskScore: z.number().min(0).max(100),

    confidence: z.number().min(0).max(100),

    threatType: z.array(z.string()),

    summary: z.string(),

    reasons: z.array(
        z.object({
            title: z.string(),
            description: z.string(),
        })
    ),

    recommendations: z.array(z.string()),

    aiExplanation: z.string(),

    technicalAnalysis: z.object({
        protocol: z.string(),
        brandDetected: z.string().nullable(),
        typosquattingDetected: z.boolean(),
        suspiciousWords: z.array(z.string()),
    }),

    scanTimestamp: z.string(),
});


// Scan URL
export const scanUrl = async (url) => {

    if (!url) {
        throw new ApiError(400, "URL is required");
    }


    // Step 1: Validate URL
    if (!isValidUrl(url)) {
        throw new ApiError(400, "Invalid URL format");
    }


    try {

        // Step 2: Create AI prompt
        const prompt = getUrlScannerPrompt(url);


        // Step 3: Call OpenRouter
        const response = await openRouterClient.chat.completions.create({

            model: process.env.OPENROUTER_MODEL,

            messages: [
                {
                    role: "system",
                    content: `
                    You are an elite Cybersecurity Threat Intelligence Analyst.

                    Analyze URLs for phishing,
                    malware,
                    scams,
                    and suspicious behavior.

                    Return ONLY valid JSON.
                    Do not use markdown.
                    `,
                },

                {
                    role: "user",
                    content: prompt,
                },
            ],

            temperature: 0.2,
        });


        // Step 4: Extract AI response
        const aiResponse = response?.choices?.[0]?.message?.content;


        if (!aiResponse) {
            throw new ApiError(
                500,
                "AI returned empty response"
            );
        }


        // Step 5: Remove markdown if AI adds it
        const cleanedResponse = aiResponse
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();



        // Step 6: Convert JSON string to object
        let parsedResponse;

        try {

            parsedResponse = JSON.parse(cleanedResponse);

        } catch (error) {

            throw new ApiError(
                500,
                "AI returned invalid JSON"
            );
        }



        // Step 7: Validate AI output
        const validation =
            urlThreatSchema.safeParse(parsedResponse);



        if (!validation.success) {

            console.error(
                validation.error.format()
            );


            throw new ApiError(
                500,
                "AI response structure is invalid"
            );
        }



        // Step 8: Return final data
        return validation.data;


    } catch (error) {

        if (error instanceof ApiError) {
            throw error;
        }


        throw new ApiError(
            500,
            error.message || "URL scanning failed"
        );

    }
};