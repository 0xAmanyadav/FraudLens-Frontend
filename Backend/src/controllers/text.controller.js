import { scanText } from "../services/text.service.js";
import { ApiError } from "../utiles/ApiError.js";
import { ApiResponse } from "../utiles/ApiRespone.js";
import { asyncHandler } from "../utiles/asyncHandler.js";

export const textScanner = asyncHandler(async (req, res) => {

    const { text } = req.body;

    if (!text) {
        throw new ApiError(400, "Text is required");
    }

    const response = await scanText(text);

    if (!response) {
        throw new ApiError(500, "Server Error");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            response,
            "Text scanned successfully"
        )
    );
});