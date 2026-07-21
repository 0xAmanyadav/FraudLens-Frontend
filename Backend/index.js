import app from './app.js'
import dotenv from "dotenv";
import connectDB from './src/db/connect.db.js';

dotenv.config();

connectDB().then(()=>{
  try{
    app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});
 // Handle server errors (like port already in use)
        app.on("error", (error) => {
            console.error("Error occurred at server:", error);
        });
  }catch(error){
    console.error("Error occurred at server:", error);
  }
})
