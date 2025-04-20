import todoModel from "../models/todo.model";
interface BodyData {
  title: string;
  description: string;
  date: string;
}
export const CreateTodoService = async (data: BodyData) => {
  return await todoModel.create(data);
};

export const GetTodoService = async () => {
  return await todoModel.find().sort({ createdAt: -1 });;
};
