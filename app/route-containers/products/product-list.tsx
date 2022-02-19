import { Product } from "@prisma/client";
import { Link, useMatches } from "remix";
import { Container } from "semantic-ui-react";

export default function ProductList() {
  const matches = useMatches();
  const products: Product[] = matches.filter((m) => m?.data?.products)[0]?.data
    ?.products;

  return (
    <Container>
      <h1>Product List</h1>
      {products.map((product) => (
        <div key={product.id}>
          <Link to={`/product/${product.id}`}>
            {product.name} {product.id}
          </Link>
        </div>
      ))}
    </Container>
  );
}
