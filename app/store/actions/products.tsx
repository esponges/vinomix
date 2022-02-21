import { Product } from "@prisma/client";
import { Dispatch } from "../context/context";
import { Actions } from "../reducers/products";

export const addToCart = (product: Product, dispatch: Dispatch) => {
    return dispatch({ type: Actions.SET_CART, payload: product });
}

export const RemoveFromCart = (product: Product, dispatch: Dispatch) => {
    return dispatch({ type: Actions.REMOVE_FROM_CART, payload: product });
}
