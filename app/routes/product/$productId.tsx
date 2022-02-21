import { ActionFunction, LoaderFunction, redirect } from "remix/server";
import { db } from "~/utils/db.server";
import { useCatch, useLoaderData, useParams } from "remix";
import { Product } from "@prisma/client";
import { Container } from "semantic-ui-react";
import { ProductCard } from "~/components/UI/organisms/product-card";

export const loader: LoaderFunction = async ({ params }) => {
  const product = await db.product.findFirst({
    where: { id: params.productId },
  });
  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }
  return product;
};

export const action: ActionFunction = async ({ request }) => { 
    // could have used params to fetch the product id,
    // but we can also use the request to get the product id
    // by using the form value from _action
    const formData = await request.formData();
    const { _action } = Object.fromEntries(formData);

    const product = await db.product.findFirst({
        where: { id: _action.toString() },
    });
    console.log('action', Object.fromEntries(formData), product)
    
    return true;
};       

export default function ProductDetails() {
  const product = useLoaderData<Product>();

  return (
    <Container>
      <ProductCard product={product} />
    </Container>
  );
}

// we already have generic catch boundaries for the entire app
// however, we can also have catch boundaries for specific routes
export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();

  if (caught.status === 404) {
    return <div>Can't find product with id {params.productId}!</div>;
  }

    throw new Error("Something went wrong")
  }
