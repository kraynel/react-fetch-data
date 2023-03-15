import { Link, Outlet, useNavigation } from "react-router-dom";

export default function Root() {
  const navigation = useNavigation();
  return (
    <>
      <div id="sidebar">
        <h1>React Router</h1>
        <nav>
          <ul>
            <li>
              <Link to="/basic">Basic Fetch</Link>
            </li>
            <li>
              <Link to="/simple-hooks">Simple Hooks</Link>
            </li>
            <li>
              <Link to="/factorized-hooks">Factorized hooks</Link>
            </li>
            <li>
              <Link to="/factorized-hooks-refresh">
                Factorized hooks, event refresh
              </Link>
            </li>
            <li>
              <Link to="/react-query">React Query</Link>
            </li>
            <li>
              <Link to="/router/1">Router fetch</Link>
            </li>
            <li>
              <Link to="/router/2">Router fetch (2)</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        {navigation.state === "loading" ? (
          <span>React router loading data</span>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
}
