export const countersLocalStorage = {
  loadState: () => {
    const counters = localStorage.getItem('counters')

    return counters ? JSON.parse(counters) : undefined
  },
  saveState: <T>(state: T) => {
    localStorage.setItem('counters', JSON.stringify(state))
  },
}
