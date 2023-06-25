import { v1 } from 'uuid'

import { countersAPI } from '../../api/countersAPI.ts'
import { CounterType } from '../../types'
import { AppThunkType } from '../index.ts'

type ActionsType = typeof actions

export type CountersActionsType = ReturnType<ActionsType[keyof ActionsType]>

const initialState = [] as CounterType[]

export const countersReducer = (
  state = initialState,
  action: CountersActionsType
): CounterType[] => {
  switch (action.type) {
    case 'GET-COUNTERS':
      return [...state, ...action.payload.counters]
    case 'INCREMENT':
      return state.map(counter =>
        counter.id === action.payload.counterId && counter.currentValue < counter.maxValue
          ? { ...counter, currentValue: counter.currentValue + 1 }
          : counter
      )
    case 'DECREMENT':
      return state.map(counter =>
        counter.id === action.payload.counterId && counter.currentValue > counter.minValue
          ? { ...counter, currentValue: counter.currentValue - 1 }
          : counter
      )
    case 'RESET':
      return state.map(counter =>
        counter.id === action.payload.counterId && counter.currentValue > counter.minValue
          ? { ...counter, currentValue: counter.minValue }
          : counter
      )
    case 'ADD-COUNTER': {
      return [...state, { id: v1(), minValue: 0, maxValue: 0, currentValue: 0 }]
    }
    case 'REMOVE-COUNTER': {
      return state.filter(counter => counter.id !== action.payload.id)
    }
    case 'UPDATE-SETTINGS':
      return state.map(counter =>
        counter.id === action.payload.id
          ? {
              ...counter,
              minValue: action.payload.minValue,
              maxValue: action.payload.maxValue,
              currentValue: action.payload.minValue,
            }
          : counter
      )
    default:
      return state
  }
}

export const actions = {
  getCounters: (counters: CounterType[]) =>
    ({ type: 'GET-COUNTERS', payload: { counters } } as const),
  increment: (counterId: string) => ({ type: 'INCREMENT', payload: { counterId } } as const),
  decrement: (counterId: string) => ({ type: 'DECREMENT', payload: { counterId } } as const),
  reset: (counterId: string) => ({ type: 'RESET', payload: { counterId } } as const),
  addCounter: () => ({ type: 'ADD-COUNTER' } as const),
  removeCounter: (id: string) => ({ type: 'REMOVE-COUNTER', payload: { id } } as const),
  updateSettings: (id: string, minValue: number, maxValue: number) =>
    ({ type: 'UPDATE-SETTINGS', payload: { id, minValue, maxValue } } as const),
}

export const getCounters = (): AppThunkType => {
  return dispatch => {
    const state = countersAPI.getState()

    state && dispatch(actions.getCounters(state))
  }
}

export const increment = (counterId: string): AppThunkType => {
  return (dispatch, getState) => {
    dispatch(actions.increment(counterId))

    const counters = getState().counters

    countersAPI.saveState(counters)
  }
}

export const decrement = (counterId: string): AppThunkType => {
  return (dispatch, getState) => {
    dispatch(actions.decrement(counterId))

    const counters = getState().counters

    countersAPI.saveState(counters)
  }
}

export const reset = (counterId: string): AppThunkType => {
  return (dispatch, getState) => {
    dispatch(actions.reset(counterId))

    const counters = getState().counters

    countersAPI.saveState(counters)
  }
}

export const addCounter = (): AppThunkType => {
  return (dispatch, getState) => {
    dispatch(actions.addCounter())

    const counters = getState().counters

    countersAPI.saveState(counters)
  }
}

export const removeCounter = (id: string): AppThunkType => {
  return (dispatch, getState) => {
    dispatch(actions.removeCounter(id))

    const counters = getState().counters

    countersAPI.saveState(counters)
  }
}

export const updateSettings = (
  counterId: string,
  minValue: number,
  maxValue: number
): AppThunkType => {
  return (dispatch, getState) => {
    dispatch(actions.updateSettings(counterId, minValue, maxValue))

    const counters = getState().counters

    countersAPI.saveState(counters)
  }
}
