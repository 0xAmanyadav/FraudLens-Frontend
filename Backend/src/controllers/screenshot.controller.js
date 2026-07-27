import {scanScreenShot} from '../services/screenshot.service.js';
import {ApiError} from '../utiles/ApiError.js'
import {ApiResponse} from '../utiles/ApiRespone.js'
import {asyncHandler} from '../utiles/asyncHandler.js'


 const screenshotScanner = asyncHandler(async (req, res) => {

    // Step 1: Get uploaded file
    const imagePath = req.file?.path;

    if (!imagePath) {
        throw new ApiError(400, "Screenshot is required");
    }

    // Step 2: Upload to Cloudinary
    const uploadedImage = await uploadOnCloudinary(imagePath);

    if (!uploadedImage) {
        throw new ApiError(500, "Failed to upload image");
    }

    // Step 3: Analyze screenshot
    const result = await scanScreenShot(uploadedImage.secure_url);

    // Step 4: (Optional) Save scan history here

    // Step 5: Return response
    return res.status(200).json(
        new ApiResponse(
            200,
           {
    screenshot: {
        imageUrl: uploadedImage.secure_url,
        publicId: uploadedImage.public_id
    },
    analysis: result
},
            "Screenshot analyzed successfully"
        )
    );
});

export default scanScreenShot;