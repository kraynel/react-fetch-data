import { useEffect, useState } from "react";
import { Post, User } from "../types";

export default function BasicFetch() {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoadingPost, setIsLoadingPost] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  // Cannot call conditionnally
  // Cannot easily refetch

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingPost(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // fake delay
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1"
        );
        const json = (await response.json()) as Post;
        setPost(json);
      } finally {
        setIsLoadingPost(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async (userId: number) => {
      setIsLoadingUser(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // fake delay
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        const json = (await response.json()) as User;
        setUser(json);
      } finally {
        setIsLoadingUser(false);
      }
    };

    if (post) {
      fetchData(post.userId);
    }
  }, [post]);

  return (
    <section>
      <h2>Basic fetch</h2>
      <p>Avantages :</p>
      <ul>
        <li>Relativement simple</li>
        <li>
          Pas de cache, on recharge la donnée à chaque mount/unmount du
          composant
        </li>
      </ul>
      <p>Inconvénients :</p>
      <ul>
        <li>Pas de cache possible</li>
        <li>Pas de réutilisation possible entre plusieurs composants</li>
      </ul>
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
