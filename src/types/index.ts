export type CounterType = {
  id: string
  minValue: number
  maxValue: number
}

export type CounterInputModelType = Omit<CounterType, 'id'> & { currentValue: number }
