import * as React from 'react'
import { productsReducer } from '../reducers/products'
import { Action } from '../reducers/products';

type State = {state: any}
type Dispatch = (action: Action) => void
type StoreProviderProps = {children: React.ReactNode, initData: any}

export type { State }

const StoreContext = React.createContext<
  {state: State; dispatch: Dispatch} | undefined
>(undefined)

function StoreProvider({children, initData}: StoreProviderProps) {
  const [state, dispatch] = React.useReducer(productsReducer, {state: initData})
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

