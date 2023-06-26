import { ChangeEvent, useCallback, useState } from 'react'

import { useAppDispatch } from '../../../../hooks'
import {
  decrement,
  increment,
  removeCounter,
  reset,
  updateSettings,
} from '../../../../store/reducers/countersReducer.ts'
import { CounterType } from '../../../../types'

type CounterInputModelType = Omit<CounterType, 'id' | 'currentValue'>

const statuses = {
  settings: 'Настройка счётчика',
}

export const useCounterLogic = (counter: CounterType) => {
  const [status, setStatus] = useState(
    counter.minValue === 0 && counter.maxValue === 0 ? statuses.settings : ''
  )
  const [values, setValues] = useState<CounterInputModelType>({
    minValue: counter.minValue,
    maxValue: counter.maxValue,
  })
  const { minValue, maxValue } = values

  const dispatch = useAppDispatch()

  const incrementCallback = useCallback(() => {
    dispatch(increment(counter.id))
  }, [dispatch, counter.id])

  const decrementCallback = useCallback(() => {
    dispatch(decrement(counter.id))
  }, [dispatch, counter.id])

  const resetCallback = useCallback(() => {
    dispatch(reset(counter.id))
  }, [dispatch, counter.id])

  const removeCounterCallback = useCallback(() => {
    dispatch(removeCounter(counter.id))
  }, [dispatch, counter.id])

  const changeModeCallback = useCallback(() => {
    if (status) {
      setStatus('')
    } else {
      setStatus(statuses.settings)
    }
  }, [status])

  const saveChangesCallback = useCallback(() => {
    if (minValue < maxValue) {
      dispatch(updateSettings(counter.id, minValue, maxValue))
      setStatus('')
      resetCallback()
    }
  }, [dispatch, counter.id, minValue, maxValue])

  const onChangeMinValueCallback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const valueToNumber = Number(e.currentTarget.value)

      valueToNumber >= -1 && setValues(prev => ({ ...prev, minValue: valueToNumber }))
    },
    [minValue]
  )

  const onChangeMaxValueCallback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const valueToNumber = Number(e.currentTarget.value)

      valueToNumber >= 0 && setValues(prev => ({ ...prev, maxValue: valueToNumber }))
    },
    [maxValue]
  )

  return {
    status,
    minValue,
    maxValue,
    onChangeMinValueCallback,
    onChangeMaxValueCallback,
    incrementCallback,
    decrementCallback,
    resetCallback,
    removeCounterCallback,
    changeModeCallback,
    saveChangesCallback,
  }
}
