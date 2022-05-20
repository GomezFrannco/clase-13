import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, (err) => {
  if (!err) {
    console.log({
      message: "Connected to MongoDB",
    });
  } else {
    console.error({
      error: err.message,
    });
  }
});

export default mongoose;