import { v1 } from 'uuid'

import { InferActionTypes } from '../index.ts'

type ActionsType = InferActionTypes<typeof actions>

type InitialStateType = typeof initialState

export const testId = 'test-id-1'
export const testId2 = 'test-id-2'

const initialState = [{ id: testId }, { id: testId2 }]

export const countersReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'ADD-COUNTER':
      return [...state, { id: action.payload.id }]
    default:
      return state
  }
}

export const actions = {
  addCounter: () => ({ type: 'ADD-COUNTER', payload: { id: v1() } } as const),
}
