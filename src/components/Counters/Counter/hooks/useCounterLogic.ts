import { ChangeEvent, useState } from 'react'

import { useDispatch } from 'react-redux'

import { AppDispatchType } from '../../../../store'
import { updateSettings } from '../../../../store/reducers/countersReducer.ts'
import { CounterInputModelType, CounterType } from '../../../../types'

export const useCounterLogic = (counter: CounterType) => {
  console.log('Counter rendering')
  const [status, setStatus] = useState('')
  const [values, setValues] = useState<CounterInputModelType>({
    minValue: counter.minValue,
    maxValue: counter.maxValue,
    currentValue: counter.minValue,
  })

  const { minValue, maxValue, currentValue } = values

  const dispatch = useDispatch<AppDispatchType>()

  const increment = () => {
    if (currentValue < maxValue) {
      setValues(prev => ({ ...prev, currentValue: prev.currentValue + 1 }))
    }
  }
  const reset = () => {
    setValues(prev => ({ ...prev, currentValue: minValue }))
  }
  const changeModeToSettings = () => {
    !status && setStatus('Настройка счётчика')
  }
  const saveChanges = () => {
    if (minValue < maxValue) {
      dispatch(updateSettings(counter.id, minValue, maxValue))
      setStatus('')
      reset()
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

  if (counter.minValue === 0 && counter.maxValue === 0) {
    changeModeToSettings()
  }

  return {
    currentValue,
    minValue,
    onChangeMinValue,
    maxValue,
    increment,
    changeModeToSettings,
    saveChanges,
    reset,
    onChangeMaxValue,
    status,
  }
}
