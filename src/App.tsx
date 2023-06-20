import { useSelector } from 'react-redux'

import { Counter } from './components/Counter/Counter.tsx'
import { AppRootStateType } from './store'
import { CounterType } from './types'

const App = () => {
  console.log('App rendering')
  const counters = useSelector<AppRootStateType, CounterType[]>(state => state.counters)

  return (
    <div className={'app'}>
      {counters.map(counter => (
        <Counter key={counter.id} counterId={counter.id} />
      ))}
    </div>
  )
}

export default App
