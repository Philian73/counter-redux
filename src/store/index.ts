import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { CountersActionsType, countersReducer } from './reducers/countersReducer.ts'

type AllActionsType = CountersActionsType

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AllActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AllActionsType
>

export type AppRootStateType = ReturnType<typeof store.getState>

const rootReducer = combineReducers({
  counters: countersReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.__store__ = store
