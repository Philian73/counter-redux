import { v1 } from 'uuid'

import { CounterType } from '../../types'

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
