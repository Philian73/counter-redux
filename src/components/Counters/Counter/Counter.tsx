import { FC, memo } from 'react'

import { CounterType } from '../../../types'
import { Button } from '../../Button/Button.tsx'

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
    onKeyDownHandler,
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

  return (
    <div className={cls.counter}>
      <Button className={cls.remove} onClick={removeCounterCallback} />
      <div className={cls.counterDisplay}>
        {!status ? (
          <span>{counter.currentValue}</span>
        ) : (
          <>
            <span>{status}</span>
            <label>
              <span>Мин.значение</span>
              <input
                type="number"
                value={minValue}
                onChange={onChangeMinValue}
                onKeyDown={onKeyDownHandler}
              />
            </label>
            <label>
              <span>Макс.значение</span>
              <input
                type="number"
                value={maxValue}
                onChange={onChangeMaxValue}
                onKeyDown={onKeyDownHandler}
              />
            </label>
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
