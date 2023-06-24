import { useCallback, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { AppDispatchType, AppRootStateType } from '../../store'
import { addCounter, getCounters } from '../../store/reducers/countersReducer.ts'
import { CounterType } from '../../types'
import { Button } from '../Button/Button.tsx'

import { Counter } from './Counter/Counter.tsx'
import cls from './Counters.module.scss'

export const Counters = () => {
  const counters = useSelector<AppRootStateType, CounterType[]>(state => state.counters)
  const dispatch = useDispatch<AppDispatchType>()

  useEffect(() => {
    dispatch(getCounters())
  }, [])

  // название поменять
  const addCounterCallback = useCallback(() => {
    dispatch(addCounter())
  }, [dispatch])

  const countersMap = counters.map(counter => {
    return <Counter key={counter.id} counter={counter} />
  })

  return (
    <div>
      <div>
        <Button onClick={addCounterCallback}>Добавить счётчик</Button>
      </div>
      <div className={cls.counters}>{countersMap}</div>
    </div>
  )
}
