import { Router } from "express";
import {upload} from "../middleware/multer.middleware.js"
import screenshotScanner from '../controllers/screenshot.controller.js'
const ScreenShotRoutes = Router()





ScreenShotRoutes.post(
    "/scan-screenshot",
    upload.single("image"),
    screenshotScanner
);


export default ScreenShotRoutes;