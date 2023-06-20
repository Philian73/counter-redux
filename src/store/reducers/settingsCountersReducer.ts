import { SettingsCountersType } from '../../types'
import { InferActionTypes } from '../index.ts'

import { testId, testId2 } from './countersReducer.ts'

type ActionsType = InferActionTypes<typeof actions>

const initialState = {
  [testId]: { isReady: true, currentValue: 0, minValue: 0, maxValue: 5 },
  [testId2]: { isReady: false, currentValue: 1, minValue: 0, maxValue: 5 },
} as SettingsCountersType

export const settingsCountersReducer = (
  state = initialState,
  action: ActionsType
): SettingsCountersType => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        [action.payload.counterId]: {
          ...state[action.payload.counterId],
          currentValue: state[action.payload.counterId].currentValue + 1,
        },
      }
    case 'RESET':
      return {
        ...state,
        [action.payload.counterId]: {
          ...state[action.payload.counterId],
          currentValue: state[action.payload.counterId].minValue,
        },
      }
    case 'CHANGE-SETTINGS':
      return {
        ...state,
        [action.payload.counterId]: {
          ...state[action.payload.counterId],
          ...action.payload.settings,
          currentValue: action.payload.settings.minValue,
          isReady: true,
        },
      }
    default:
      return state
  }
}

export const actions = {
  increment: (counterId: string) => ({ type: 'INCREMENT', payload: { counterId } } as const),
  reset: (counterId: string) => ({ type: 'RESET', payload: { counterId } } as const),
  changeSettings: (counterId: string, settings: { minValue: number; maxValue: number }) =>
    ({ type: 'CHANGE-SETTINGS', payload: { counterId, settings } } as const),
}
