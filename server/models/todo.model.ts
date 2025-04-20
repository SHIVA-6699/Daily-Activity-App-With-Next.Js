import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
},
{
    timestamps:true
}
);

const todoModel = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
export default todoModel;
