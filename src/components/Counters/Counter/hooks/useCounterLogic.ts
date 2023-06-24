import { KeyboardEvent, ChangeEvent, useCallback, useState } from 'react'

import { useAppDispatch } from '../../../../hooks/useAppDispatch.ts'
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

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const regex = /[.,]/

    if (regex.test(e.key)) {
      e.preventDefault()
    }
  }
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
    onKeyDownHandler,
    onChangeMinValue,
    onChangeMaxValue,
    incrementCallback,
    decrementCallback,
    resetCallback,
    removeCounterCallback,
    changeModeCallback,
    saveChangesCallback,
  }
}
