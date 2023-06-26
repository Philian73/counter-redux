import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts'
import { actions } from '../../store/reducers/countersReducer.ts'
import { CounterType } from '../../types'
import { Button } from '../../UI-Kit/Button/Button.tsx'

import { Counter } from './Counter/Counter.tsx'
import cls from './Counters.module.scss'

export const Counters = () => {
  const counters = useAppSelector<CounterType[]>(state => state.counters)
  const dispatch = useAppDispatch()

  const addCounterCallback = useCallback(() => {
    dispatch(actions.addCounter())
  }, [dispatch])

  const countersMap = counters.map(counter => {
    return <Counter key={counter.id} counter={counter} />
  })

  return (
    <div className={cls.countersBlock}>
      <Button onClick={addCounterCallback}>Добавить счётчик</Button>
      {!!counters.length && <div className={cls.counters}>{countersMap}</div>}
    </div>
  )
}
