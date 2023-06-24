import { beforeEach, describe, expect, it } from 'vitest'

import { CounterType } from '../../../types'
import { actions, countersReducer } from '../countersReducer.ts'

describe('countersReducer', () => {
  let counterId_1: string
  let counterId_2: string
  let counterId_3: string
  let initialState: CounterType[]

  beforeEach(() => {
    counterId_1 = 'counterId_1'
    counterId_2 = 'counterId_2'
    counterId_3 = 'counterId_3'

    initialState = [
      { id: counterId_1, currentValue: 2, minValue: 2, maxValue: 5 },
      { id: counterId_2, currentValue: 3, minValue: 0, maxValue: 5 },
      { id: counterId_3, currentValue: 5, minValue: 0, maxValue: 5 },
    ]
  })

  it('getCounters test', () => {
    const someId_1 = 'some-id-1'
    const someId_2 = 'some-id-2'
    const counters = [
      { id: someId_1, currentValue: 0, minValue: 0, maxValue: 5 },
      { id: someId_2, currentValue: 0, minValue: 0, maxValue: 5 },
    ]

    const action = actions.getCounters(counters)
    const endState = countersReducer(initialState, action)

    expect(endState).toHaveLength(5)
    expect(endState[0].id).toBe(counterId_1)
    expect(endState[1].id).toBe(counterId_2)
    expect(endState[2].id).toBe(counterId_3)
    expect(endState[3].id).toBe(someId_1)
    expect(endState[4].id).toBe(someId_2)
  })

  it('increment test', () => {
    const action = actions.increment(counterId_2)
    const endState = countersReducer(initialState, action)

    const action2 = actions.increment(counterId_3)
    const endState2 = countersReducer(endState, action2)

    expect(endState[0].currentValue).toBe(2)
    expect(endState[1].currentValue).toBe(4)
    expect(endState[2].currentValue).toBe(5)

    expect(endState2[2].currentValue).toBe(5)
  })

  it('decrement test', () => {
    const action = actions.decrement(counterId_2)
    const endState = countersReducer(initialState, action)

    const action2 = actions.decrement(counterId_1)
    const endState2 = countersReducer(endState, action2)

    expect(endState[0].currentValue).toBe(2)
    expect(endState[1].currentValue).toBe(2)
    expect(endState[2].currentValue).toBe(5)

    expect(endState2[0].currentValue).toBe(2)
  })

  it('reset test', () => {
    const action = actions.reset(counterId_2)
    const endState = countersReducer(initialState, action)

    const action2 = actions.reset(counterId_1)
    const endState2 = countersReducer(endState, action2)

    expect(endState[0].currentValue).toBe(2)
    expect(endState[1].currentValue).toBe(0)
    expect(endState[2].currentValue).toBe(5)

    expect(endState2[0].currentValue).toBe(2)
  })

  it('addCounter test', () => {
    const action = actions.addCounter()
    const endState = countersReducer(initialState, action)

    expect(endState).toHaveLength(4)
    expect(endState[3].id).toBeDefined()
  })

  it('removeCounter test', () => {
    const action = actions.removeCounter(counterId_2)
    const endState = countersReducer(initialState, action)

    expect(endState).toHaveLength(2)
    expect(endState[0].currentValue).toBe(2)
    expect(endState[1].currentValue).toBe(5)
  })

  it('updateSettings test', () => {
    const action = actions.updateSettings(counterId_2, 15, 25)
    const endState = countersReducer(initialState, action)

    expect(endState[0].minValue).toBe(2)
    expect(endState[0].maxValue).toBe(5)

    expect(endState[1].minValue).toBe(15)
    expect(endState[1].maxValue).toBe(25)

    expect(endState[2].minValue).toBe(0)
    expect(endState[2].maxValue).toBe(5)
  })
})
