import { useEffect, useState } from "react";
import { Post, User } from "../types";

export const useCommonFetch = <T>({
  readyToFetch,
  path,
}: {
  readyToFetch: boolean;
  path: string;
}): { isLoading: boolean; data: T | undefined } => {
  const [data, setData] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // fake delay
        const response = await fetch(
          `https://jsonplaceholder.typicode.com${path}`
        );
        const json = (await response.json()) as T;
        if(!ignore) {
          setData(json);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (readyToFetch) {
      fetchData();
    }

    return () => {
      ignore = true;
    };
  }, [readyToFetch, path]);

  return { isLoading, data };
};

export const usePost = ({
  readyToFetch,
  id,
}: {
  readyToFetch: boolean;
  id: number;
}) => {
  return useCommonFetch<Post>({ readyToFetch, path: `/posts/${id}` });
};
export const useUser = ({
  readyToFetch,
  id,
}: {
  readyToFetch: boolean;
  id: number;
}) => {
  return useCommonFetch<User>({ readyToFetch, path: `/users/${id}` });
};
