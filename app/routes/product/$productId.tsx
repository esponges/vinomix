import { LoaderFunction, redirect } from "remix/server";
import { db } from "~/utils/db.server";
import { useLoaderData } from "remix";
import { Product } from "@prisma/client";
import { Button, Grid, Header, Message } from "semantic-ui-react";

export const loader: LoaderFunction = async ({ params }) => {
  const product = await db.product.findFirst({
    where: { id: params.productId },
  });
  if (!product) {
    return redirect("/");
  }
  console.log(product);
  return product;
};

export default function ProductDetails() {
  const product = useLoaderData<Product>();
  console.log(product.name, product.description, product);

  return (
    <div>
      <Grid container>
        <Grid.Row>
          <Grid.Column>
            <Message>
              <Header as="h1">{product.name}</Header>
              <p>{product.description}</p>
              <Button color="blue">Learn more &raquo;</Button>
              <h1></h1>
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
