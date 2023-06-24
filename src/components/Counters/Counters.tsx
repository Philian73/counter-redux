import { useCallback, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { addCounter, getCounters } from '../../store/reducers/countersReducer.ts'
import { Button } from '../Button/Button.tsx'

import { Counter } from './Counter/Counter.tsx'
import cls from './Counters.module.scss'

export const Counters = () => {
  const counters = useAppSelector(state => state.counters)
  const dispatch = useAppDispatch()

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
    <div className={cls.countersBlock}>
      <Button onClick={addCounterCallback}>Добавить счётчик</Button>
      <div className={cls.counters}>{countersMap}</div>
    </div>
  )
}
