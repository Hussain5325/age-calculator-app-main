import { useState } from 'react'

function App() {
  const [Data, setData] = useState({
    Day: '',
    Month: '',
    Year: '',
    Error: false,
  })

  const [Results, setResults] = useState({
    days: '',
    months: '',
    years: '',
    Error: false,
  })

  function Change(e) {
    const { value, name } = e.target
    return setData(prev => {
      return {
        ...prev,
        [name]: value * 1, // Multiply by one is to convert string into number
      }
    })
  }

  function Click() {
    const date = new Date()

    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    if (
      Data.Day > 0 &&
      Data.Day <= 31 &&
      Data.Month > 0 &&
      Data.Month <= 12 &&
      Data.Year > 0 &&
      Data.Year < year
    ) {
      setResults(prev => {
        return {
          ...prev,
          days: Data.Day > day ? Data.Day - day : day - Data.Day,
          months:
            Data.Month > month ? month - Data.Month + 12 : month - Data.Month,
          years: Data.Month > month ? year - Data.Year - 1 : year - Data.Year,
          Error: true,
        }
      })
    }

    setData(prev => {
      return {
        ...prev,
        Error: true,
      }
    })
  }

  const Style = [
    (Data.Error && Data.Day === '') || Data.Day < 0
      ? { color: 'hsl(0, 100%, 67%)' }
      : { color: 'hsl(0, 1%, 44%)' },

    (Data.Error && Data.Day === '') || Data.Day < 0
      ? { borderColor: 'hsl(0, 100%, 67%)' }
      : { borderColor: 'hsl(0, 1%, 44%)' },

    (Data.Error && Data.Month === '') || Data.Month < 0
      ? { color: 'hsl(0, 100%, 67%)' }
      : { color: 'hsl(0, 1%, 44%)' },

    (Data.Error && Data.Month === '') || Data.Month < 0
      ? { borderColor: 'hsl(0, 100%, 67%)' }
      : { borderColor: 'hsl(0, 1%, 44%)' },

    (Data.Error && Data.Year === '') ||
    Data.Year < 0 ||
    Data.Year > new Date().getFullYear()
      ? { color: 'hsl(0, 100%, 67%)' }
      : { color: 'hsl(0, 1%, 44%)' },

    (Data.Error && Data.Year === '') ||
    Data.Year < 0 ||
    Data.Year > new Date().getFullYear()
      ? { borderColor: 'hsl(0, 100%, 67%)' }
      : { borderColor: 'hsl(0, 1%, 44%)' },
  ]

  return (
    <section className='App'>
      <section className='input-containers'>
        <article className='input-each-container'>
          <label htmlFor='Day' style={Style[0]}>
            DAY
          </label>
          <input
            type='number'
            placeholder='DD'
            className='inputs'
            name='Day'
            value={Data.Day}
            onChange={Change}
            id='Day'
            style={Style[1]}
          />
          {Data.Error && (
            <span className='error'>
              {Data.Day === ''
                ? 'This field is required'
                : Data.Day > 31 || Data.Day < 0
                ? 'Must be a valid day'
                : ''}
            </span>
          )}
        </article>
        <article className='input-each-container'>
          <label htmlFor='Month' style={Style[2]}>
            MONTH
          </label>
          <input
            type='number'
            placeholder='MM'
            className='inputs'
            name='Month'
            value={Data.Month}
            onChange={Change}
            id='Month'
            style={Style[3]}
          />
          {Data.Error && (
            <span className='error'>
              {Data.Month === ''
                ? 'This field is required'
                : Data.Month > 12 || Data.Month < 0
                ? 'Must be a valid month'
                : ''}
            </span>
          )}
        </article>
        <article className='input-each-container'>
          <label htmlFor='Year' style={Style[4]}>
            YEAR
          </label>
          <input
            type='number'
            placeholder='YYYY'
            className='inputs'
            name='Year'
            value={Data.Year}
            onChange={Change}
            id='Year'
            style={Style[5]}
          />
          {Data.Error && (
            <span className='error'>
              {Data.Year === ''
                ? 'This field is required'
                : Data.Year > new Date().getFullYear() || Data.Year < 0
                ? 'Must be a valid Year'
                : ''}
            </span>
          )}
        </article>
      </section>
      <section className='Button-container'>
        <button className='btn' onClick={Click}>
          <img src='/icon-arrow.svg' alt='svg' />
        </button>
      </section>
      <section className='result'>
        <h1>
          <p className='nums'>
            {Results.Error && Data.Year ? Results.years : '--'}
          </p>{' '}
          years
        </h1>
        <h1>
          <p className='nums'>
            {Results.Error && Data.Month ? Results.months : '--'}
          </p>{' '}
          months
        </h1>
        <h1>
          <p className='nums'>
            {Results.Error && Data.Day ? Results.days : '--'}
          </p>{' '}
          days
        </h1>
      </section>
    </section>
  )
}

export default App
