import { useEffect } from "react";
import { useLoaderData } from "remix";
import { Container } from "semantic-ui-react";
import { useStoreContext } from "~/store/context/context";

export default function Index() {
  const { state, dispatch } = useStoreContext();


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
