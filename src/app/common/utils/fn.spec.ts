import {getMessageError, getToday, getTodayPlusNDays, pad} from './fn'

describe('fn utils global', () => {
  it('should getMessageError custom', () => {
    const msgError = "Error Custom"
    expect(
      getMessageError(msgError)
    ).toEqual(msgError)
  })

  it('should getMessageError not custom', () => {
    expect(
      getMessageError({})
    ).toEqual('Error del servidor')
  })

  it('should return string with 2 length', () => {
    expect(
      pad(9)
    ).toHaveLength(2)
  })

  it('should contains caracter "p"', () => {
    expect(
      pad(9, 'p')
    ).toContain('p')
  })

  it('should getToday', () => {
    const today = new Date();

    expect(
      getToday()
    ).toEqual(
      `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`
    )
  })

  it('should getTodayPlusNDays', () => {
    const nDays = 10
    const date: Date = new Date();

    date.setDate(date.getDate() + nDays)

    expect(
      getTodayPlusNDays(nDays)
    ).toEqual(
      `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
    )
  })
})
