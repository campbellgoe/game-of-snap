import Head from 'next/head'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

const Card = styled(({ className = '', image, value, suit, code }) => {
return <div className={className + ' Card'}>
  <Image src={image} alt={code} width={226} height={314}/>
  <p>{value} of {suit}</p>
</div>
})`
border: none;
padding: 0;
margin: 0;
width: 226px;
height: 314px;
display: inline-block;
`

const MatchedMessage = ({ className = '', leftCard, rightCard }) => {
  const suitMessage = useMemo(() => {
    return leftCard.suit === rightCard.suit ? 'SNAP SUIT!' : ''
  }, [leftCard, rightCard])
  const valueMessage = useMemo(() => {
    return leftCard.value === rightCard.value ? 'SNAP VALUE!' : ''
  }, [leftCard, rightCard])
  return <div className={className}>
    {suitMessage && (<p>{suitMessage}</p>)}
    {valueMessage && (<p>{valueMessage}</p>)}
  </div>
}

const PickCard = ({ className = '', onPickCard, onEnded, onRemaining }) => {
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
}

const EndMessage = ({ className = '', suits, values }) => {
  const totalSuits = suits.length
  const totalValues = values.length
  return <div className={className + ' EndMessage'}>
    <p>VALUE MATCHES: {totalValues}</p>
    <p>SUIT MATCHES: {totalSuits}</p>
  </div>
}

const App = ({ className = ''}) => {
  const [remaining, setRemaining] = useState(52)
  const [suits, setSuits] = useState([])
  const [values, setValues] = useState([])
  const [showEndMessage, setShowEndMessage] = useState(false)
  const [[leftCard, rightCard], setCards] = useState([null, null])

  useEffect(() => {
    if(leftCard && rightCard){
      if(leftCard.suit === rightCard.suit){
        setSuits(suits => ([...suits, leftCard.suit]))
      }
      if(leftCard.value === rightCard.value){
        setValues(values => ([...values, leftCard.value]))
      }
    }
  }, [leftCard, rightCard])

  return <div className={className}>
    {leftCard && <Card className="LeftCard" {...leftCard}/>}
    {rightCard && <Card className="RightCard"{...rightCard}/>}
    {leftCard && rightCard && <MatchedMessage leftCard={leftCard} rightCard={rightCard}/>}
    <PickCard
    onPickCard={newCard => {
      setCards(cards => ([cards[1], newCard]))
    }}
    onEnded={() => {
      setShowEndMessage(true)
    }}
    onRemaining={remaining => {
      setRemaining(remaining)
    }}
    />
    {showEndMessage && <EndMessage suits={suits} values={values}/>}
    {remaining} / 52 remaining
  </div>

}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Game of snap</title>
        <meta name="description" content="Game of snap" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App className="GameOfCards"/>
    </div>
  )
}
