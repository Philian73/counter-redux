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
  } = useCounterLogic(counter)

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
              error={conditions.minValue}
            >
              Мин.значение
            </LabelInputNumber>
            <LabelInputNumber
              value={maxValue}
              onChange={onChangeMaxValueCallback}
              error={conditions.maxValue}
            >
              Макс.значение
            </LabelInputNumber>
          </>
        )}
      </div>
      <div className={cls.counterControl}>
        {!status ? (
          <>
            <Button onClick={incrementCallback} disabled={conditions.inc}>
              inc
            </Button>
            <Button onClick={decrementCallback} disabled={conditions.dec}>
              dec
            </Button>
            <Button onClick={resetCallback} disabled={conditions.reset}>
              reset
            </Button>
            <Button onClick={changeModeCallback}>set</Button>
          </>
        ) : (
          <>
            <Button onClick={changeModeCallback} disabled={conditions.back}>
              back
            </Button>
            <Button onClick={saveChangesCallback} disabled={conditions.save}>
              save
            </Button>
          </>
        )}
      </div>
    </div>
  )
})
