import { FC, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { AppRootStateType } from '../../store'
import { actions } from '../../store/reducers/settingsCountersReducer.ts'
import { SettingsCounterType } from '../../types'
import { Button } from '../Button/Button.tsx'

import cls from './Counter.module.scss'

type PropsType = {
  counterId: string
}
export const Counter: FC<PropsType> = ({ counterId }) => {
  const settingsCounter = useSelector<AppRootStateType, SettingsCounterType>(
    state => state.settingsCounters[counterId]
  )
  const { isReady, currentValue, minValue, maxValue } = settingsCounter

  const dispatch = useDispatch()

  const [values, setValues] = useState({
    minValue,
    maxValue,
  })

  return (
    <div className={cls.counter}>
      <div className={cls.counterDisplay}>
        {isReady ? (
          <span>{currentValue}</span>
        ) : (
          <>
            <span>Ошибка</span>
            <label>
              <span>Мин.значение</span>
              <input
                type="number"
                value={values.minValue}
                onChange={e => setValues({ ...values, minValue: Number(e.currentTarget.value) })}
              />
            </label>
            <label>
              <span>Макс.значение</span>
              <input
                type="number"
                value={values.maxValue}
                onChange={e => setValues({ ...values, maxValue: Number(e.currentTarget.value) })}
              />
            </label>
          </>
        )}
      </div>
      <div className={cls.counterControl}>
        {isReady ? (
          <>
            <Button onClick={() => dispatch(actions.increment(counterId))}>inc</Button>
            <Button>reset</Button>
            <Button>set</Button>
          </>
        ) : (
          <Button
            onClick={() => {
              dispatch(actions.changeSettings(counterId, values))
              console.log(isReady)
            }}
          >
            save
          </Button>
        )}
      </div>
    </div>
  )
}
