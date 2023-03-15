import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { useTodos } from "../lib/fetchTodos";
import utilStyles from "../styles/utils.module.css";

export default function BasicFetch({}) {
  // Cannot call conditionnally
  // Cannot easily refetch

  const {isLoading, data} = useTodos();

  return (
    <Layout>
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
        {isLoading && <span>Loading</span>}
        {!isLoading && data.length > 0 ? (
          <ul className={utilStyles.list}>
            {data.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        ) : null}
      </section>
    </Layout>
  );
}
