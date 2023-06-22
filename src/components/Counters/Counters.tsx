import { FC } from 'react'

import { useSelector } from 'react-redux'

import { AppRootStateType } from '../../store'
import { CounterType } from '../../types'

import { Counter } from './Counter/Counter.tsx'

type PropsType = {}
export const Counters: FC<PropsType> = ({}) => {
  console.log('CounterSSSS rendering')
  const counters = useSelector<AppRootStateType, CounterType[]>(state => state.counters)

  const countersMap = counters.map(counter => {
    return <Counter key={counter.id} counter={counter} />
  })

  return <>{countersMap}</>
}
