export const countersAPI = {
  getState: () => {
    const counters = localStorage.getItem('counters')

    if (counters !== null) return JSON.parse(counters)
  },
  saveState: <T>(state: T) => {
    localStorage.setItem('counters', JSON.stringify(state))
  },
}
