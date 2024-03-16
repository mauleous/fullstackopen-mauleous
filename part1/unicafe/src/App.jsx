import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </>
  )
}

const Statistics = (props) => {
  if (props.statisticData.all == 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr><StatisticLine text="good" value={props.statisticData.good}/></tr>
          <tr><StatisticLine text="neutral" value={props.statisticData.neutral}/></tr>
          <tr><StatisticLine text="bad" value={props.statisticData.bad}/></tr>
          <tr><StatisticLine text="all" value={props.statisticData.all}/></tr>
          <tr><StatisticLine text="average" value={props.statisticData.average}/></tr>
          <tr><StatisticLine text="positive" value={props.statisticData.positive + " %"}/></tr>
        </tbody>        
      </table>
    </>    
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.label}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  const [statistics, setStatistics] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0
  })

  const handleFeedback = (feedbackType) => () => {    
    const newAll = all + 1
    let newGood = good
    let newNeutral = neutral
    let newBad = bad

    if (feedbackType === 'good') {
      newGood = good + 1
      setGood(newGood)
    }
    else if (feedbackType === 'neutral') {
      newNeutral = neutral + 1
      setNeutral(newNeutral)
    }
    else {
      newBad = bad + 1
      setBad(newBad)
    }

    const newAverage = (newGood - newBad) / newAll
    const newPositive = newGood / newAll * 100
    const newStatistics = {
      good: newGood,
      neutral: newNeutral,
      bad: newBad,
      all: newAll,
      average: newAverage,
      positive: newPositive
    }
    
    setAll(newAll)
    setAverage(newAverage)
    setPositive(newPositive)
    setStatistics(newStatistics)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button label="good" onClick={handleFeedback('good')}/>
      <Button label="neutral" onClick={handleFeedback('neutral')}/>
      <Button label="bad" onClick={handleFeedback('bad')}/>

      <Statistics statisticData={statistics} />

    </div>
  )
}

export default App