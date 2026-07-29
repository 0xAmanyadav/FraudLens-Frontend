import { scanUrl } from '../services/url.service.js';
import {ApiError} from '../utiles/ApiError.js'
import {ApiResponse} from '../utiles/ApiRespone.js'
import {asyncHandler} from '../utiles/asyncHandler.js'

export const urlScanner = asyncHandler(async(req,res)=>{

const {url} =req.body;
if(!url){
    throw new ApiError(400,"Url is required")
}
const response = await scanUrl(url)
if(!response){
    throw new ApiError(500,"server error")
}
return res.status(200).json(ApiResponse(200,response,"URL scanned successfully"))


})