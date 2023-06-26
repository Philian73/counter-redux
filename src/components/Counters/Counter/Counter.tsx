import { FC, memo } from 'react'

import { CounterType } from '../../../types'
import { Button } from '../../../UI-Kit/Button/Button.tsx'
import { LabelInputNumber } from '../../../UI-Kit/LabelInputNumber/LabelInputNumber.tsx'

import cls from './Counter.module.scss'
import { useCounterLogic } from './hooks/useCounterLogic.ts'

type PropsType = {
  counter: CounterType
}

export const Counter: FC<PropsType> = memo(({ counter }) => {
  const {
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
  } = useCounterLogic(counter)

  const buttonDisabledConditions = {
    inc: counter.currentValue === maxValue,
    dec: counter.currentValue === minValue,
    reset: counter.currentValue === minValue,
    save:
      (counter.minValue === minValue && counter.maxValue === maxValue) ||
      (minValue <= 0 && maxValue === 0),
    back: counter.minValue === 0 && counter.maxValue === 0,
  }

  const errors = {
    minValue: minValue === -1,
    maxValue: maxValue <= minValue,
  }

  return (
    <div className={cls.counter}>
      <Button className={cls.remove} onClick={removeCounterCallback} />
      <div className={cls.counterDisplay}>
        {!status ? (
          <span className={counter.currentValue === counter.maxValue ? cls.limit : ''}>
            {counter.currentValue}
          </span>
        ) : (
          <>
            <span>{status}</span>
            <LabelInputNumber
              value={minValue}
              onChange={onChangeMinValueCallback}
              error={errors.minValue}
            >
              Мин.значение
            </LabelInputNumber>
            <LabelInputNumber
              value={maxValue}
              onChange={onChangeMaxValueCallback}
              error={errors.maxValue}
            >
              Макс.значение
            </LabelInputNumber>
          </>
        )}
      </div>
      <div className={cls.counterControl}>
        {!status ? (
          <>
            <Button onClick={incrementCallback} disabled={buttonDisabledConditions.inc}>
              inc
            </Button>
            <Button onClick={decrementCallback} disabled={buttonDisabledConditions.dec}>
              dec
            </Button>
            <Button onClick={resetCallback} disabled={buttonDisabledConditions.reset}>
              reset
            </Button>
            <Button onClick={changeModeCallback}>set</Button>
          </>
        ) : (
          <>
            <Button onClick={changeModeCallback} disabled={buttonDisabledConditions.back}>
              back
            </Button>
            <Button onClick={saveChangesCallback} disabled={buttonDisabledConditions.save}>
              save
            </Button>
          </>
        )}
      </div>
    </div>
  )
})
