import { v1 } from 'uuid'

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
    case 'ADD-COUNTER': {
      return [...state, { id: v1(), minValue: 0, maxValue: 0 }]
    }
    case 'REMOVE-COUNTER': {
      return state.filter(counter => counter.id !== action.payload.counterId)
    }
    case 'UPDATE-SETTINGS':
      return state.map(counter =>
        counter.id === action.payload.id
          ? { ...counter, minValue: action.payload.minValue, maxValue: action.payload.maxValue }
          : counter
      )
    default:
      return state
  }
}

export const actions = {
  getCounters: (counters: CounterType[]) =>
    ({ type: 'GET-COUNTERS', payload: { counters } } as const),
  addCounter: () => ({ type: 'ADD-COUNTER' } as const),
  removeCounter: (counterId: string) =>
    ({ type: 'REMOVE-COUNTER', payload: { counterId } } as const),
  updateSettings: (id: string, minValue: number, maxValue: number) =>
    ({ type: 'UPDATE-SETTINGS', payload: { id, minValue, maxValue } } as const),
}

export const getCounters = (): AppThunkType => {
  return dispatch => {
    const counters = localStorage.getItem('counters')

    counters && dispatch(actions.getCounters(JSON.parse(counters)))
  }
}

export const addCounter = (): AppThunkType => {
  return (dispatch, getState) => {
    dispatch(actions.addCounter())

    const counters = getState().counters

    localStorage.setItem('counters', JSON.stringify(counters))
  }
}

export const removeCounter = (counterId: string): AppThunkType => {
  return (dispatch, getState) => {
    dispatch(actions.removeCounter(counterId))

    const counters = getState().counters

    localStorage.setItem('counters', JSON.stringify(counters))
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

    localStorage.setItem('counters', JSON.stringify(counters))
  }
}
