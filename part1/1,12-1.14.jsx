import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes,setVotes] = useState([0,0,0,0,0,0,0,0])
  const [maxIndex, setMaxIndex]=useState(0)
  const handleRandom = ()=>{
    const newSelected = (Math.floor(Math.random()*8))
    setSelected(newSelected)
   
  }
  
  const handleVote = ()=>{
    const index = selected;
    const arrayCopy = votes;
    arrayCopy[index]+=1;
    setVotes([...arrayCopy])
    
    const maxVote = Math.max.apply(null, votes)
    setMaxIndex(votes.indexOf(maxVote))
  }

   
  return (
    <div>
      {anecdotes[selected]}<br/>
      <button onClick={handleRandom}>Get new anecdote</button>
      <button onClick = {handleVote}>vote</button>
      <p>Has {votes[selected]} votes</p>

      <h1>Most voted anecdote:</h1>
      <p>{anecdotes[maxIndex]} with {votes[maxIndex]} votes!</p>
    </div>
    
  )
}

export default App
