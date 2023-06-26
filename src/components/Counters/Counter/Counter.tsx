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
    onChangeMinValue,
    onChangeMaxValue,
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
    save: counter.minValue === minValue && counter.maxValue === maxValue,
    back: counter.minValue === 0 && counter.maxValue === 0,
  }

  const styles = {
    currentValue: counter.currentValue === counter.maxValue ? cls.limit : '',
  }

  return (
    <div className={cls.counter}>
      <Button className={cls.remove} onClick={removeCounterCallback} />
      <div className={cls.counterDisplay}>
        {!status ? (
          <span className={styles.currentValue}>{counter.currentValue}</span>
        ) : (
          <>
            <span>{status}</span>
            <LabelInputNumber
              value={minValue}
              onChange={onChangeMinValue}
              error={minValue >= maxValue || minValue <= -1}
            >
              Мин.значение
            </LabelInputNumber>
            <LabelInputNumber
              value={maxValue}
              onChange={onChangeMaxValue}
              error={maxValue <= minValue}
            >
              Мин.значение
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
