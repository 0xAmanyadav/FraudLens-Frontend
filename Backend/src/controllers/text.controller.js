import { scanText } from '../services/text.service.js';
import {ApiError} from '../utiles/ApiError.js'
import {ApiResponse} from '../utiles/ApiRespone.js'
import {asyncHandler} from '../utiles/asyncHandler.js'

const textScanner = asyncHandler(()=>{
    const {text}=req.body;
    if(!url){
    throw new ApiError(400,"Text is required")
}
const response = await scanText(text)
if(!response){
    throw new ApiError(500,"server error")
}
return res.status(200).json(ApiResponse(200,response,"URL scanned successfully"))




})