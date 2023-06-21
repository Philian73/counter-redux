import { Counters } from './components/Counters/Counters.tsx'

const App = () => {
  console.log('App rendering')

  return (
    <div className={'app'}>
      <Counters />
    </div>
  )
}

export default App
