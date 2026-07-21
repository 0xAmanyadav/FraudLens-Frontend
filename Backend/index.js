import app from './app.js'
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT||8000;

app.get('/',(req,res)=>{
    console.log("helllo this is my first sever")
})



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});