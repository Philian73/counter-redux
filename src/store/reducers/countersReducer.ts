import { Dispatch } from 'redux'
import { v1 } from 'uuid'

import { CounterType } from '../../types'
import { AppRootStateType, InferActionTypes } from '../index.ts'

type ActionsType = InferActionTypes<typeof actions>

const initialState = [] as CounterType[]

export const countersReducer = (state = initialState, action: ActionsType): CounterType[] => {
  switch (action.type) {
    case 'GET-COUNTERS':
      return [...state, ...action.payload.counters]
    case 'UPDATE-SETTINGS':
      return state.map(counter =>
        counter.id === action.payload.id
          ? { ...counter, minValue: action.payload.minValue, maxValue: action.payload.maxValue }
          : counter
      )
    case 'ADD-COUNTER': {
      return [...state, { id: v1(), minValue: 0, maxValue: 0 }]
    }
    default:
      return state
  }
}

export const actions = {
  getCounters: (counters: CounterType[]) =>
    ({ type: 'GET-COUNTERS', payload: { counters } } as const),
  addCounter: () => ({ type: 'ADD-COUNTER' } as const),
  updateSettings: (id: string, minValue: number, maxValue: number) =>
    ({ type: 'UPDATE-SETTINGS', payload: { id, minValue, maxValue } } as const),
}

export const getCounters = () => (dispatch: Dispatch) => {
  const items = localStorage.getItem('counters')

  items && dispatch(actions.getCounters(JSON.parse(items)))
}

export const updateSettings = (counterId: string, minValue: number, maxValue: number) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(actions.updateSettings(counterId, minValue, maxValue))

    const counters = getState().counters

    localStorage.setItem('counters', JSON.stringify(counters))
  }
}

export const addCounter = () => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(actions.addCounter())

    const counters = getState().counters

    localStorage.setItem('counters', JSON.stringify(counters))
  }
}
