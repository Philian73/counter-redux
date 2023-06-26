import { throttle } from 'lodash'
import { combineReducers, legacy_createStore } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { countersLocalStorage } from '../api/localStorage.ts'

import { CountersActionsType, countersReducer } from './reducers/countersReducer.ts'

type AllActionsType = CountersActionsType

export type AppRootStateType = ReturnType<typeof store.getState>

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AllActionsType>

const rootReducer = combineReducers({
  counters: countersReducer,
})

const preloadedState = {
  counters: countersLocalStorage.loadState(),
}

export const store = legacy_createStore(rootReducer, preloadedState)

store.subscribe(
  throttle(() => {
    countersLocalStorage.saveState(store.getState().counters)
  }, 1000)
)
