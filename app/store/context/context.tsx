import * as React from 'react'
import { Action, Actions, cartItemsReducer, productsReducer } from '../reducers/products';
import { combineReducers } from '../rootReducer';

export type State = {
  state: any
}

type StoreProviderReducerProps = {
  state: State,
  dispatch: React.Dispatch<Actions>,
};

type StoreProviderProps = {children: React.ReactNode, initData: any};

const StoreContext = React.createContext<
  StoreProviderReducerProps | undefined
>(undefined);

const reducers = combineReducers(productsReducer, cartItemsReducer);

function StoreProvider({children, initData}: StoreProviderProps) {
  const [state, dispatch] = React.useReducer(reducers, {state: initData}); // dont really need products reducer, remove it in the future
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = {state, dispatch};
  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
}

function useStoreContext() {
  const context = React.useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStoreContext must be used within a StoreProvider')
  }
  return context
}

export {StoreProvider, useStoreContext}

