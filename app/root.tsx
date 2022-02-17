import {
  json,
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  ShouldReloadFunction,
  useLoaderData,
} from "remix";
import type { MetaFunction } from "remix";
import { Link, useSearchParams } from "react-router-dom";
import { StoreProvider } from "~/store/context/context";
import { GenericErrorBoundary } from "./route-containers/boundaries/generic-error-boundary";
import { GenericCatchBoundary } from "./route-containers/boundaries/generic-catch-boundary";
import { Product } from "@prisma/client";
import { getSession, getUser } from "~/utils/session.server";
import { db } from "~/utils/db.server";
import { CartItem } from "~/models/ecommerce-provider.server";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

// init data
export type LoaderData = {
  user: string | undefined;
  products: Product[];
  cartItems: CartItem[];
};

export let loader: LoaderFunction = async ({ request, params }) => {
  let user = await getUser(request);
  const products = await db.product.findMany();
  const cartItems = await (await getSession(request, null)).getCart();
  let url = new URL(request.url);
  let term = url.searchParams.get("login");
  console.log(term, params);
  
  return json<LoaderData>({ user: user?.username, products, cartItems });
};

export const unstable_shouldReload: ShouldReloadFunction = ({ submission }) => {
  
  return submission?.method === 'POST';
};

export function App({ children }: { children: React.ReactNode }) {
  const data = useLoaderData();
  const params = useSearchParams();
  // console.log(params);

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
