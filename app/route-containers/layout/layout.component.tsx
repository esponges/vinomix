import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { MetaFunction } from "remix";
import { Link } from "react-router-dom";
import { LoaderData } from "~/store/initialData.server";
import { StoreProvider } from "~/store/context/context";
import { GenericErrorBoundary } from "../boundaries/generic-error-boundary";
import { GenericCatchBoundary } from "../boundaries/generic-catch-boundary";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};
// init data

export function App({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<LoaderData>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <StoreProvider initData={data}>
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
                <Link to="/hello/world">Hello</Link>
                {data?.user ? (
                  <div className="user-info">
                    <span>{`Hi ${data.user}`}</span>
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
          {children}
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </body>
      </StoreProvider>
    </html>
  );
};

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <App>
      <GenericErrorBoundary error={error} />
    </App>
  );
};

export function CatchBoundary() {
  return (
    <App>
      <GenericCatchBoundary />
    </App>
  );
};

export default function Root() {

    return (
        <App>
            <Outlet />
        </App>
    );
};
