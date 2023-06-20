export type CounterType = {
  id: string
}

export type SettingsCounterType = {
  isReady: boolean
  currentValue: number
  minValue: number
  maxValue: number
}

export type SettingsCountersType = {
  [key: string]: SettingsCounterType
}
