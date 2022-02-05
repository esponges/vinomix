import { useEffect } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import { Container } from "semantic-ui-react";
import { useStoreContext } from "~/store/context/context";
import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";

// init data
export const loader: LoaderFunction = async ({ request }) => {
  const products = await db.product.findMany();
  const user = await getUser(request);
  return { products, user: user?.username };
};

export default function Index() {
  const { products, user } = useLoaderData<any>();
  const { state, dispatch } = useStoreContext();

  useEffect((): void => {
    dispatch({ type: "SET_PRODUCTS", payload: products });
  }, [products]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Container>
        <h1>Bienvenido a tu tienda</h1>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://remix.run/tutorials/blog"
              rel="noreferrer"
            >
              15m Quickstart Blog Tutorial
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://remix.run/tutorials/jokes"
              rel="noreferrer"
            >
              Deep Dive Jokes App Tutorial
            </a>
          </li>
          <li>
            <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
              Remix Docs
            </a>
          </li>
        </ul>
      </Container>
    </div>
  );
}
