// app/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface ListOfItem {
  title: string;
  description: string;
  date: string;
}

export default function Home() {
  const [listOfTodos, setListOfTodos] = useState<ListOfItem[] | null>(null);

  useEffect(() => {
    const handleFetchTodoList = async () => {
      try {
        const response = await fetch("/api/todo");
        const results = await response.json();
        setListOfTodos(results);
      } catch (error) {
        console.error("Failed to fetch todos", error);
        setListOfTodos([]);
      }
    };

    handleFetchTodoList();
  }, []);

  if (listOfTodos === null) {
    return <div>Loading...</div>;
  }
  console.log(listOfTodos);

  return (
    <div className="flex items-center flex-col mt-5">
      <Link href="/todos" className="w-[30rem] text-center flex justify-between text-2xl">
        <span className="text-center">To Todo</span>
        <Link className="p-1 bg-blue-500 rounded text-lg" href={"/todos"}>Create Todo</Link>
      </Link>
      <div
        className="w-[30rem] h-[40rem] overflow-y-auto"
        style={{
          scrollbarWidth: "none" /* For Firefox */,
          msOverflowStyle: "none" /* For Internet Explorer and Edge */,
        }}
      >
        {/* Hide scrollbar for WebKit browsers */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {listOfTodos.length === 0 ? (
          <p>No todos yet.</p>
        ) : (
          listOfTodos.map((item, index) => (
            <div
              key={index}
              className="flex flex-col bg-gray-700 p-2 my-2 rounded"
            >
              <div className="flex gap-x-2 items-baseline justify-between">
                <p>{item.title}</p>
                <p className="text-sm text-gray-300">{item.date}</p>
              </div>
              <p>{item.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
