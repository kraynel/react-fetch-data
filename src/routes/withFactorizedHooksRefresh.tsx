import {
  usePost,
  useUser,
  REFRESH_USER,
  REFRESH_POST,
} from "../lib/fetchFactorizedWithRefresh";

export default function FactorizedHooksRefresh() {
  // Avantage : factorisé
  // Inconvénient : magie sur le ready to fetch
  // Inconvénient : fallback nécessaire sur userId si on n'est pas prêt
  // Inconvénient : ignore souvent oublié

  const { isLoading: isLoadingPost, data: post } = usePost({
    readyToFetch: true,
    id: 1,
  });
  const { isLoading: isLoadingUser, data: user } = useUser({
    readyToFetch: Boolean(post?.userId),
    id: post?.userId ?? 0,
  });

  return (
    <section>
      <h2>FactorizedHooksRefresh</h2>
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
            window.dispatchEvent(new CustomEvent(REFRESH_USER));
          }}
        >
          REFRESH USER
        </button>
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent(REFRESH_POST));
          }}
        >
          REFRESH POST
        </button>
      </p>
    </section>
  );
}
