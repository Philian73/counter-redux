import { ChangeEvent, useCallback, useState } from 'react'

import { useDispatch } from 'react-redux'

import { AppDispatchType } from '../../../../store'
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

  const dispatch = useDispatch<AppDispatchType>()

  const incrementCallback = useCallback(() => {
    dispatch(increment(counter.id))
  }, [dispatch, counter.id])
  const decrementCallback = useCallback(() => {
    dispatch(decrement(counter.id))
  }, [dispatch, counter.id])
  const resetCallback = useCallback(() => {
    dispatch(reset(counter.id))
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

  const removeCounterCallback = useCallback(() => {
    dispatch(removeCounter(counter.id))
  }, [dispatch])

  const onChangeMinValue = (e: ChangeEvent<HTMLInputElement>) => {
    const valueToNumber = Number(e.currentTarget.value)

    if (valueToNumber > -1 && valueToNumber < maxValue) {
      setValues(prev => ({ ...prev, minValue: valueToNumber }))
    }
  }
  const onChangeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
    const valueToNumber = Number(e.currentTarget.value)

    if (valueToNumber > minValue) {
      setValues(prev => ({ ...prev, maxValue: valueToNumber }))
    }
  }

  return {
    status,
    minValue,
    maxValue,
    onChangeMinValue,
    onChangeMaxValue,
    changeModeCallback,
    incrementCallback,
    decrementCallback,
    resetCallback,
    removeCounterCallback,
    saveChangesCallback,
  }
}
