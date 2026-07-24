// Import Cloudinary's v2 API and rename it as 'cloudinary'
import { v2 as cloudinary } from 'cloudinary';

// Import the promises-based version of the 'fs' module
import fs from 'fs/promises';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY,       // API key for authentication
    api_secret: process.env.CLOUDINARY_API_SECRET  // API secret for authentication
});



const uploadToCloudinary = async (filePath, folder) => {
    // Safety check: ensure a file path is provided
    if (!filePath) {
        throw new Error("File path is required for uploading to Cloudinary");
    }

    try {
        // Upload the file to Cloudinary
        // 'folder' specifies the folder in your Cloudinary account
        // 'resource_type: auto' lets Cloudinary detect file type (image, video, etc.)
        const response = await cloudinary.uploader.upload(filePath, {
            folder: folder,
            resource_type: "auto"
        });
        return response;
    } catch (error) {
        // Log the error for debugging
        console.error("Error uploading file to Cloudinary:", error);
        // Rethrow the error so calling code can handle it
        throw error;
    } finally {
        // After upload (successful or not), delete the local file to free up space
        try {
            await fs.unlink(filePath);
        } catch (unlinkError) {
            // Log if the file cleanup fails, but don't let it hide the original error
            console.error("Failed to delete local file:", unlinkError);
        }
    }
}

// Export the function so it can be used in other files
export { uploadToCloudinary };