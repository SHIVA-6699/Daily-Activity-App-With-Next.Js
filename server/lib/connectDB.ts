import mongoose from "mongoose";
let connectedDB = false;
export const connectDB = async () => {
  if (connectedDB) return;
  try {
    await mongoose.connect("mongodb://localhost:27017/todo");
    connectedDB = true;
    console.log("Connecting MongoDB");
  } catch (e) {
    console.log(e);
  }
};
