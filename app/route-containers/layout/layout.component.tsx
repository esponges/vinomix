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
import { Link } from "react-router-dom";
import { StoreProvider } from "~/store/context/context";
import { GenericErrorBoundary } from "../boundaries/generic-error-boundary";
import { GenericCatchBoundary } from "../boundaries/generic-catch-boundary";
import { Product } from "@prisma/client";
import { getSession, getUser } from "~/utils/session.server";
import { db } from "~/utils/db.server";
import { CartItem } from "~/models/ecommerce-provider.server";
import {
  Button,
  Container,
  Menu,
  Segment,
} from "semantic-ui-react";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

// init data
export type LoaderData = {
  user: string | undefined;
  products: Product[];
  cartItems: CartItem[];
};

export let loader: LoaderFunction = async ({ request }) => {
  let user = await getUser(request);
  const products = await db.product.findMany();
  const cartItems = await (await getSession(request, null)).getCart();

  return json<LoaderData>({ user: user?.username, products, cartItems });
};

export const unstable_shouldReload: ShouldReloadFunction = ({
  submission
}) => {
  return submission?.method === "POST";
};

export function App({ children }: { children: React.ReactNode }) {
  const data = useLoaderData();

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
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 50, padding: "1em 0em" }}
              vertical
            >
              <Menu fixed="top" inverted pointing secondary size="large">
                <Container>
                  <Menu.Item>
                    <Link to="/">Home</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link to="/hello/world">Hello</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link to="/product/product-list">List</Link>
                  </Menu.Item>
                  <Menu.Item position="right">
                    {data?.user ? (
                      <div className="user-info">
                        {/* <span>{`Hi ${data.user}`}</span> */}
                        <form action="/logout" method="post">
                          <Button
                            inverted
                            primary
                            type="submit"
                            style={{ marginLeft: "0.5em" }}
                          >
                            Logout
                          </Button>
                        </form>
                      </div>
                    ) : (
                      <Button inverted>
                        <Link to="/login">Login</Link>
                      </Button>
                    )}
                  </Menu.Item>
                </Container>
              </Menu>
            </Segment>
          {children}
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </body>
      </StoreProvider>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <App>
      <GenericErrorBoundary error={error} />
    </App>
  );
}

export function CatchBoundary() {
  return (
    <App>
      <GenericCatchBoundary />
    </App>
  );
}

export default function Root() {
  return (
    <App>
      <Outlet />
    </App>
  );
}
