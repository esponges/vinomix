import type { State } from "../context/context";

type Action = {
    type: 'SET_PRODUCTS'
    payload: [any]
}

export function productsReducer(state: State, action: Action) {
    switch (action.type) {
      case 'SET_PRODUCTS': {
        return { ...state, products: action.payload}
      }
      default: {
        return state
      }
    }
  }

export type { Action }
