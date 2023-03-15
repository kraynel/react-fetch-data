import { usePost, useUser } from "../lib/fetchFactorized";

export default function FactorizedHooks() {
  // Avantage : factorisé
  // Inconvénient : magie sur le readyToFetch
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
      <h2>Factorized hooks</h2>
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
    </section>
  );
}
