export enum Actions {
  SET_PRODUCTS = 'SET_PRODUCTS',
  SET_CART = 'SET_CART',
}

type Action = {
  type: Actions,
  payload: any;
};

export function productsReducer(state: any, action: Action) {
  switch (action.type) {
    case Actions.SET_PRODUCTS: {
      console.log('productsReducer', action.payload);
      return { ...state, products: action.payload };
    }
    default: {
      return state;
    }
  }
}

export function cartItemsReducer(state: any, action: Action) {
  console.log(action.payload);
  switch (action.type) {
    case Actions.SET_CART: {
      console.log('set cart', action.payload);
      return { ...state, cartItems: action.payload };
    }
    default: {
      return state;
    }
  }
}

export type { Action };
