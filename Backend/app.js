import express from "express";
import urlRoutes from "./src/routes/url.route.js";
import textRoutes from "./src/routes/text.route.js";
import ScreenShotRoutes from "./src/routes/screenshot.route.js";

const app = express();





//register url 
app.use('api/v1/url',urlRoutes)
app.use('api/v1/text',textRoutes)
app.use('api/v1/screenshot',ScreenShotRoutes)


export default app;