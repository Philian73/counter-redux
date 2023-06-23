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
    currentValue,
    minValue,
    maxValue,
    onChangeMinValue,
    onChangeMaxValue,
    changeModeToSettings,
    increment,
    reset,
    saveChanges,
  } = useCounterLogic(counter)

  return (
    <div className={cls.counter}>
      <div className={cls.counterDisplay}>
        {!status ? (
          <span>{currentValue}</span>
        ) : (
          <>
            <span>{status}</span>
            <label>
              <span>Мин.значение</span>
              <input type="number" value={minValue} onChange={onChangeMinValue} />
            </label>
            <label>
              <span>Макс.значение</span>
              <input type="number" value={maxValue} onChange={onChangeMaxValue} />
            </label>
          </>
        )}
      </div>
      <div className={cls.counterControl}>
        {!status ? (
          <>
            <Button onClick={increment} disabled={currentValue === maxValue}>
              inc
            </Button>
            <Button onClick={reset} disabled={currentValue === minValue}>
              reset
            </Button>
            <Button onClick={changeModeToSettings}>set</Button>
          </>
        ) : (
          <Button onClick={saveChanges}>save</Button>
        )}
      </div>
    </div>
  )
})
