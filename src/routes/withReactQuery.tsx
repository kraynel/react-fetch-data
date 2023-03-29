import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { fetchPost, fetchUser } from "../lib/rawFetch";

const queryClient = new QueryClient();

export default function ReactQueryWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDemo />
    </QueryClientProvider>
  );
}

function ReactQueryDemo() {
  const { isLoading: isLoadingPost, data: post } = useQuery(
    ["post", 1],
    () => fetchPost(1)
  );
  const { isLoading: isLoadingUser, data: user } = useQuery(
    ["user", post?.userId],
    () => post?.userId ? fetchUser(post?.userId) : undefined,
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
