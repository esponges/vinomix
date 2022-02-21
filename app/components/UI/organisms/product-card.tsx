import { Product } from "@prisma/client";
import { Button, Grid, Header, Message } from "semantic-ui-react";
import { useStoreContext } from "~/store/context/context";
import { Actions } from "~/store/reducers/products";

export function ProductCard({ product }: { product: Product }) {
  const { state, dispatch } = useStoreContext();
  console.log(state);

  const addToCart = () => {
    dispatch({
      type: Actions.SET_CART,
      payload: product,
    });
  };

  return (
    <div>
      <Grid container>
        <Grid.Row>
          <Grid.Column>
            <Message>
              <Header as="h1">{product.name}</Header>
              <p>{product.description}</p>
              <Button color="blue" onClick={() => addToCart()}>
                Add to cart
              </Button>
              {/* </form> */}
              <h1></h1>
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
