// seen in https://stackoverflow.com/questions/57296549/hooks-combine-multiple-reducers-when-using-usereducer/57298115#57298115

import { State } from "./context/context";

export const combineReducers = (...reducers: Function[]) => 
  (state: State, action: any): any => {
    for(let i=0;i<reducers.length;i++) 
      state = reducers[i](state, action)
    return state;
  }
