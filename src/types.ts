export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: boolean;
}

export interface Comment {
  postId: number;
  id: number;
  title: string;
  body: boolean;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

