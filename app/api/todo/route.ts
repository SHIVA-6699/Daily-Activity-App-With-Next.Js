import {
  CreateTodoController,
  GetTodosController,
} from "@/server/controllers/todo.controller";
import { connectDB } from "@/server/lib/connectDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const todo = await CreateTodoController(req);
    return NextResponse.json([true, todo]);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const todoList = await GetTodosController();
    return NextResponse.json(todoList);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to Fetch Todo List" },
      { status: 500 }
    );
  }
}
