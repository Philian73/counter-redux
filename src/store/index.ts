import { AnyAction, combineReducers, legacy_createStore } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { countersReducer } from './reducers/countersReducer.ts'
import { settingsCountersReducer } from './reducers/settingsCountersReducer.ts'

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AnyAction
>

export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U }
  ? U
  : never

export type AppRootStateType = ReturnType<typeof store.getState>

const rootReducer = combineReducers({
  counters: countersReducer,
  settingsCounters: settingsCountersReducer,
})

export const store = legacy_createStore(rootReducer)

// @ts-ignore
window.__store__ = store
