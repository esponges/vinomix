import {
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { MetaFunction } from "remix";
import { Link } from "react-router-dom";
import { getUser } from "./utils/session.server";
import { User } from "@prisma/client";
import { StoreProvider, useStoreContext } from "./store/context/context";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

type LoaderData = {
  user: User | null;
};

export let loader: LoaderFunction = async ({ request }) => {
  let user = await getUser(request);
  return { user };
};

function App() {
  const data = useLoaderData<LoaderData>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <StoreProvider>
        <body>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
          />
          <script src="https://cdn.jsdelivr.net/npm/semantic-ui-react/dist/umd/semantic-ui-react.min.js"></script>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
                {data.user ? (
                  <div className="user-info">
                    <span>{`Hi ${data.user.username}`}</span>
                    <form action="/logout" method="post">
                      <button type="submit" className="button">
                        Logout
                      </button>
                    </form>
                  </div>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
            </ul>
          </nav>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </body>
      </StoreProvider>
    </html>
  );
}

export default App;
