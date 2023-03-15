import { useTodos } from "../lib/fetchTodos";

export default function SimpleHooks() {
  // Cannot call conditionnally
  // Cannot easily refetch

  const {isLoading, data} = useTodos();

  return (
      <section >
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
        {isLoading && <span>Loading</span>}
        {!isLoading && data.length > 0 ? (
          <ul>
            {data.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        ) : null}
      </section>
  );
}
