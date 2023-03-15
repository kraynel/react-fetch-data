import { useLoaderData } from "react-router-dom";
import { Post, User } from "../types";

export default function RouterData() {
const {post, user} = useLoaderData() as {post: Post, user: User};
  return (
      <section >
        <h2>Router</h2>
        <section><h1>{post.title}</h1>{user.email}</section>
      </section>
  );
}
