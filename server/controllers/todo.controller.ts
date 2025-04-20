import { CreateTodoService, GetTodoService } from "../services/todo.service";

export const CreateTodoController = async (req: Request) => {
  const body = await req?.json();
  return await CreateTodoService(body);
};

export const GetTodosController = async () => {
  return await GetTodoService();
};
