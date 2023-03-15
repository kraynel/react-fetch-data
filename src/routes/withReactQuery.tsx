import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Post, User } from "../types";

const fetchPost = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // fake delay
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  return (await response.json()) as Post;
};

const fetchUser = async (userId?: number) => {
  if(!userId) return;

  await new Promise((resolve) => setTimeout(resolve, 1000)); // fake delay
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  return (await response.json()) as User;
};

const queryClient = new QueryClient();

export default function ReactQueryWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDemo />
    </QueryClientProvider>
  );
}

function ReactQueryDemo() {
  const { isLoading: isLoadingPost, data: post } = useQuery<Post, Error>(
    ["post", 1],
    fetchPost
  );
  const { isLoading: isLoadingUser, data: user } = useQuery(
    ["user", post?.userId],
    () => fetchUser(post?.userId),
    { enabled: Boolean(post?.userId) }
  );

  return (
    <section>
      <h2>React query</h2>
      {isLoadingPost && <span>Loading post</span>}
      {!isLoadingPost && post ? (
        <>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </>
      ) : null}

      {isLoadingUser && <span>Loading user</span>}
      {!isLoadingUser && user ? (
        <span>
          by <a href={`mailto:${user.email}`}>{user.name}</a>
        </span>
      ) : null}
      <p>
        <button
          onClick={() => {
            queryClient.invalidateQueries(['user', 1])
          }}
        >
          REFRESH USER
        </button>
        <button
          onClick={() => {
            queryClient.invalidateQueries(['post', 1])
          }}
        >
          REFRESH POST
        </button>
      </p>
    </section>
  );
}
