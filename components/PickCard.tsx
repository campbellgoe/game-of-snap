import { useCallback, useEffect, useState } from "react"
import styled from "styled-components"

const PickCard = styled(({ className = '', onPickCard, onEnded, onRemaining }) => {
  const [ended, setEnded] = useState(false)
  const [deckId, setDeckId] = useState('new')
  const handleFetchCard = useCallback(async () => {
    try {
      const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      const data = await res.json()
      if(deckId === 'new'){
        setDeckId(data.deck_id)
      }
      const remaining = data.remaining
        const card = data.cards[0]
        onPickCard(card)
        if(remaining === 0){
          setEnded(true)
        }
        onRemaining(remaining)
    } catch(err){
      console.error(err)
    }
  }, [deckId])
  useEffect(() => {
    if(ended){
      onEnded()
    }
  }, [ended])
  return (
    <div className={className}>
      {!ended && <button
      onClick={handleFetchCard}
      >Draw card</button>}
    </div>
  )
})`
  button {
    color: white;
    font-size: 16px;
    font-weight: bold;
    background-color: #4b28d6;
    padding: 1rem 2rem;
    border: 1px solid #6b4eff;
    border-radius: 8px;
    cursor: pointer;

    :hover {
      background-color: #6b4eff;
    }
  }
`
export default PickCard
