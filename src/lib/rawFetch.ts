import { Post, Todo, User } from "../types";

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const fetchTodos = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // fake delay
  const response = await fetch(
    `${BASE_URL}/users/1/todos`
  );
  return response.json() as Promise<Todo[]>;
};


export const fetchPost = async (postId: number, request?: Partial<Request>) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // fake delay
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    request
  );
  return response.json() as Promise<Post>;
};

export const fetchUser = async (userId: number, request?: Partial<Request>) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // fake delay
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    request
  );
  return response.json() as Promise<User>;
};
