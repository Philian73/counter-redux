import { v1 } from 'uuid'

import { CounterType } from '../../types'
import { InferActionTypes } from '../index.ts'

type ActionsType = InferActionTypes<typeof actions>

const initialState = [
  { id: v1(), minValue: 0, maxValue: 5 },
  { id: v1(), minValue: 0, maxValue: 5 },
  { id: v1(), minValue: 0, maxValue: 5 },
] as CounterType[]

export const countersReducer = (state = initialState, action: ActionsType): CounterType[] => {
  switch (action.type) {
    case 'ADD-COUNTER': {
      return [
        ...state,
        { id: v1(), minValue: action.payload.minValue, maxValue: action.payload.maxValue },
      ]
    }
    case 'CHANGE-SETTINGS':
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
  addCounter: (minValue: number, maxValue: number) =>
    ({ type: 'ADD-COUNTER', payload: { minValue, maxValue } } as const),
  changeSetting: (id: string, minValue: number, maxValue: number) =>
    ({ type: 'CHANGE-SETTINGS', payload: { id, minValue, maxValue } } as const),
}
