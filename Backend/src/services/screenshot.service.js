import { ApiError } from "../utils/ApiError.js";
import { getImageScannerPrompt } from "../prompt/promptImage.js";

import { openRouterClient } from "../config/openRouter.js";

// Validate Cloudinary image URL
function isValidImageUrl(url) {
    try {
        const parsed = new URL(url);

        return (
            parsed.protocol === "https:" &&
            /\.(png|jpg|jpeg|webp)$/i.test(parsed.pathname)
        );
    } catch {
        return false;
    }
}





  //zod validor 

  const imageThreatSchema = z.object({

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
    ).min(1),

    recommendations: z.array(z.string()).min(1),

    aiExplanation: z.string(),

    technicalAnalysis: z.object({

        detectedBrand: z.string().nullable(),

        containsLoginForm: z.boolean(),

        containsQRCode: z.boolean(),

        containsSuspiciousURL: z.boolean(),

        containsFinancialRequest: z.boolean(),

        containsOTPRequest: z.boolean(),

        containsUrgency: z.boolean(),

        containsPhoneNumber: z.boolean(),

        containsEmail: z.boolean(),

        suspiciousKeywords: z.array(z.string())

    }),

    scanTimestamp: z.string().optional()

});

// Scan Screenshot
export const scanScreenShot = async (imageUrl) => {

    // Step 1: Validate URL
    if (!imageUrl) {
        throw new ApiError(400, "Image URL is required");
    }

    if (!isValidImageUrl(imageUrl)) {
        throw new ApiError(400, "Invalid image URL");
    }

    // Step 2: Generate Prompt
    const prompt = getImageScannerPrompt({
        language: "English",
    });

    try {

        // Step 3: Call OpenRouter Vision Model
        const response =
            await openRouterClient.chat.completions.create({

                model: process.env.OPENROUTER_MODEL,

                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: prompt,
                            },
                            {
                                type: "image_url",
                                image_url: {
                                    url: imageUrl,
                                },
                            },
                        ],
                    },
                ],

                temperature: 0.2,
            });

        // Step 4: Extract AI Response
        const aiResponse =
            response?.choices?.[0]?.message?.content;

        if (!aiResponse) {
            throw new ApiError(
                500,
                "AI returned an empty response."
            );
        }

        // Step 5: Remove Markdown
        const cleanedResponse = aiResponse
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        // Step 6: Parse JSON
        let parsedResponse;

        try {
            parsedResponse = JSON.parse(cleanedResponse);
        } catch {
            throw new ApiError(
                500,
                "AI returned invalid JSON."
            );
        }

        // Step 7: Add Timestamp
        parsedResponse.scanTimestamp =
            new Date().toISOString();

        // Step 8: Validate Response
        const validation =
            imageThreatSchema.safeParse(parsedResponse);

        if (!validation.success) {

            console.error(validation.error.format());

            throw new ApiError(
                500,
                "AI response validation failed."
            );
        }

        // Step 9: Return Result
        return validation.data;

    } catch (error) {

        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(
            500,
            error.message || "Screenshot analysis failed."
        );
    }
};