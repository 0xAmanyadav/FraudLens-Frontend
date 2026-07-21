import mongoose from 'mongoose'; // we import mongoose to connect to the database
import { DB_Name } from '../constant.js'; // we import the database name from the constants file
// here i create a fuction that connect the database and if it is connected it will log a message to the console and if it is not connected it will log an error message to the console and exit the process with failure
const connectDB=async()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_Name}`);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}


export default connectDB;