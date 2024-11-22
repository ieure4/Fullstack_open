import React,{useCallback, useState} from 'react'



const Button = (props)=><button onClick={props.onClick}>{props.text}</button>
const StatisticLine = (props)=><p>{props.text} {props.statistic}</p>

const Statistics= (props)=>{

  if(props.total>0){
    return(
    <>
      <h2>statistics</h2>
      {/* <StatisticLine text = "good" statistic = {props.clicks.good} /> 
      <StatisticLine text = "neutral" statistic = {props.clicks.neutral} /> 
      <StatisticLine text = "bad" statistic = {props.clicks.bad} /> 
      <StatisticLine text = "all" statistic = {props.total} /> 
      <StatisticLine text = "average" statistic = {props.average.toFixed(2)} /> 
      <StatisticLine text = "positive" statistic = {`${(props.positive*100).toFixed(2)}%`} />  */}

      <table>
        <tbody>
          <tr>
            <th scope ="row">good</th>
            <td>{props.clicks.good}</td>
          </tr>
          <tr>
            <th scope ="row">neutral</th>
            <td>{props.clicks.neutral}</td>
          </tr>
          <tr>
            <th scope ="row">bad</th>
            <td>{props.clicks.bad}</td>
          </tr>
          <tr>
            <th scope ="row">total</th>
            <td>{props.total}</td>
          </tr>
          <tr>
            <th scope ="row">average</th>
            <td>{props.average.toFixed(2)}</td>
          </tr>
          <tr>
            <th scope ="row">positive</th>
            <td>{`${(props.positive*100).toFixed(2)}%`}</td>
          </tr>
        </tbody>
      </table>
     
    </>
  )}else{
    return <h2>No feedback given</h2>
  }
    

  
}
const App = ()=>{
  const [clicks, setClicks] = useState({good:0,neutral:0,bad:0})
  
  const [total, setTotal] = useState(0);
  const [score, setScore]=useState(0);
  const [positive, setPositive] = useState(0)
  const [average, setAverage] = useState(0);
  
  
  const handleGoodClick = ()=>{
    const updatedScore = score+1;
    setScore(updatedScore);
    const updatedGood = clicks.good+1;  
    setClicks({...clicks, good:updatedGood});
    setTotal(updatedGood+clicks.bad+clicks.neutral);
    setAverage(updatedScore/(updatedGood+clicks.bad+clicks.neutral));
    setPositive(updatedGood/(updatedGood+clicks.bad+clicks.neutral))
    
    
    
  }
  const handleNeutralClick = ()=>{
    
    const updatedNeutral = clicks.neutral+1; 
      setClicks({...clicks, neutral:updatedNeutral});
      setTotal(updatedNeutral+clicks.bad+clicks.good);
      setAverage(score/(updatedNeutral+clicks.bad+clicks.good))
      setPositive(clicks.good/(updatedNeutral+clicks.bad+clicks.good))
      
      
  }
  const handleBadClick = ()=>{
    const updatedScore = score-1;
    setScore(updatedScore);
    const updatedBad = clicks.bad+1; 
      setClicks({...clicks, bad:updatedBad});
      setTotal(updatedBad+clicks.good+clicks.neutral);
      setAverage(updatedScore/(updatedBad+clicks.good+clicks.neutral));
    setPositive(clicks.good/(updatedBad+clicks.good+clicks.neutral))
      
  }
  
  
  return(
   <>
   <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text = "good"/>
      <Button onClick={handleNeutralClick} text = "neutral"/>
      <Button onClick={handleBadClick} text = "bad"/>
    </div>
    <Statistics clicks = {clicks} total = {total} average={average} positive={positive}  />
   </> 
  )
}

export default App
