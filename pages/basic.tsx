import Head from "next/head";
import { useEffect, useState } from "react";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { Post, Todo, User } from "../types";

export default function BasicFetch({}) {
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
    const fetchData = async () => {
      setIsLoadingUser(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // fake delay
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${post.userId}`
        );
        const json = (await response.json()) as User;
        setUser(json);
      } finally {
        setIsLoadingUser(false);
      }
    };

    if (post) {
      fetchData();
    }
  }, [post]);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Basic fetch</h2>
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
        {!isLoadingUser && user ? <span>by <a href={`mailto:${user.email}`}>{user.name}</a></span> : null}
      </section>
    </Layout>
  );
}
