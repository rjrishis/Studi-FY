import mongoose from "mongoose";

const dbConnect = async () => {
   try {
     const data = await mongoose.connect(`${process.env.MONGODB_URI}`)
     console.log(`Connected to MongoDB successfully`,data.connection.host);
   } catch (error) {
    console.log(`Error connecting to MongoDB `, error)
    process.exit(1);
   }
}

export default dbConnect;