import { useEffect, useState } from "react";
import { Todo } from "../types";

export const useTodos = () => {
  const [data, setData] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // fake delay
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/1/todos"
        );
        const json = (await response.json()) as Todo[];
        setData(json);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { isLoading, data };
};

// We are missing cancellation function
// We cannot force-refresh the todo list

