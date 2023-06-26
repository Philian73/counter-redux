import { ChangeEvent, useCallback, useState } from 'react'

import { useAppDispatch } from '../../../../hooks/hooks.ts'
import { actions } from '../../../../store/reducers/countersReducer.ts'
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
    dispatch(actions.increment(counter.id))
  }, [dispatch, counter.id])

  const decrementCallback = useCallback(() => {
    dispatch(actions.decrement(counter.id))
  }, [dispatch, counter.id])

  const resetCallback = useCallback(() => {
    dispatch(actions.reset(counter.id))
  }, [dispatch, counter.id])

  const removeCounterCallback = useCallback(() => {
    dispatch(actions.removeCounter(counter.id))
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
      dispatch(actions.updateSettings(counter.id, minValue, maxValue))
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

  const conditions = {
    inc: counter.currentValue === maxValue,
    dec: counter.currentValue === minValue,
    reset: counter.currentValue === minValue,
    save:
      (counter.minValue === minValue && counter.maxValue === maxValue) ||
      minValue < 0 ||
      maxValue <= minValue,
    back: counter.minValue === 0 && counter.maxValue === 0,
    minValue: minValue === -1,
    maxValue: maxValue <= minValue,
  }

  return {
    conditions,
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
