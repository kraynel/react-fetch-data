import { useEffect, useState } from "react";
import { Post, User } from "../types";

export const REFRESH_USER = "REFRESH_USER";
export const REFRESH_POST = "REFRESH_POST";

export const useCommonFetch = <T>({
  readyToFetch,
  path,
  refreshEvent,
}: {
  readyToFetch: boolean;
  path: string;
  refreshEvent?: string;
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
        if (!ignore) {
          console.log("SET DATA", path);
          setData(json);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    if (readyToFetch) {
      console.log("FETCH", path);
      fetchData();
    }

    if (refreshEvent) {
      console.log("ADD EVENT LISTENER", refreshEvent);
      window.addEventListener(refreshEvent, fetchData);
    }

    return () => {
      // ignore = true;
      if (refreshEvent) {
        console.log("REMOVE EVENT LISTENER", refreshEvent);
        window.removeEventListener(refreshEvent, fetchData);
      }
    };
  }, [readyToFetch, path, refreshEvent]);

  return { isLoading, data };
};

export const usePost = ({
  readyToFetch,
  id,
}: {
  readyToFetch: boolean;
  id: number;
}) => {
  return useCommonFetch<Post>({
    readyToFetch,
    path: `/posts/${id}`,
    refreshEvent: REFRESH_POST,
  });
};

export const useUser = ({
  readyToFetch,
  id,
}: {
  readyToFetch: boolean;
  id: number;
}) => {
  return useCommonFetch<User>({
    readyToFetch,
    path: `/users/${id}`,
    refreshEvent: REFRESH_USER,
  });
};
