"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // ✅ Import router
interface FormData {
  title: string;
  description: string;
  date: string;
}

export default function Home() {
  const router = useRouter(); // ✅ use the router

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json", 
      },
    });

    const status = await response.json();

    if (status[0]) {
      toast.success("✅ Todo Successfully Created");
      router.push("/todos"); // ✅ Navigate to todos page
    }

    reset();
  };

  return (
    <form className="space-y-12 mt-5" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl text-white text-center">Todo App</h1>
      <div className="lg:w-[30rem] p-3 lg:px-0 w-full h-[40rem] rounded-2xl mx-auto space-y-5">
        <div className="title-filed flex flex-col space-y-3">
          <label htmlFor="title">Todo Title</label>
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {errors?.title && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex flex-col space-y-3">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {errors?.description && (
            <span className="text-red-500">Description is required</span>
          )}
        </div>
        <div className="expiray-data flex flex-col space-y-3">
          <label htmlFor="date">Expiry Date</label>
          <input
            type="date"
            id="date"
            {...register("date", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {errors?.date && (
            <span className="text-red-500">Date is required</span>
          )}
        </div>
        <div className="add-todo mt-16">
          <button
            type="submit"
            className="w-full p-3 cursor-pointer bg-blue-500 text-white rounded-xl"
          >
            Add Todo
          </button>
        </div>
      </div>
    </form>
  );
}
