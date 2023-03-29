import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, LoaderFunction, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import BasicFetch from "./routes/basic";
import FactorizedHooks from "./routes/withFactorizedHooks";
import FactorizedHooksRefresh from "./routes/withFactorizedHooksRefresh";
import ReactQueryWrapper from "./routes/withReactQuery";
import SimpleHooks from "./routes/withSimpleHooks";
import RouterData from "./routes/withRouter";
import { fetchPost, fetchUser } from "./lib/rawFetch";

const loadData: LoaderFunction = async ({ request, params }) => {
  const post = await fetchPost(Number(params.postId), { signal: request.signal});
  const user = await fetchUser(Number(post.userId), { signal: request.signal});
  return { user, post };
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/basic",
        element: <BasicFetch />,
      },
      {
        path: "/simple-hooks",
        element: <SimpleHooks />,
      },
      {
        path: "/factorized-hooks",
        element: <FactorizedHooks />,
      },
      {
        path: "/factorized-hooks-refresh",
        element: <FactorizedHooksRefresh />,
      },
      {
        path: "/react-query",
        element: <ReactQueryWrapper />,
      },
      {
        path: "/router/:postId",
        element: <RouterData />,
        loader: loadData,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
