import { useEffect, useState } from "react";
import { Todo } from "../types";
import { fetchTodos } from "./rawFetch";

export const useTodos = () => {
  const [data, setData] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const json = await fetchTodos();
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

