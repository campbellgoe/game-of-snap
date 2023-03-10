import Head from 'next/head'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Container } from '../components/sharedstyles'

const Card = styled(({ className = '', image, code }) => {
return <div className={className + ' Card'}>
  {image && <Image src={image} alt={code} width={226} height={314}/>}
</div>
})`
border: ${({ image }) => image ? 'none' : '1px solid black'};
padding: 0;
margin: 1rem .5rem;
width: 226px;
height: 314px;
display: inline-block;
`

const MatchedMessage = styled(({ className = '', leftCard, rightCard }) => {
  const suitMessage = useMemo(() => {
    return leftCard.suit === rightCard.suit ? 'SNAP SUIT!' : ''
  }, [leftCard, rightCard])
  const valueMessage = useMemo(() => {
    return leftCard.value === rightCard.value ? 'SNAP VALUE!' : ''
  }, [leftCard, rightCard])
  return <div className={className + ' Messages'}>
    {suitMessage && (<p>{suitMessage}</p>)}
    {valueMessage && (<p>{valueMessage}</p>)}
  </div>
})`

position: absolute;
top: 1.8rem;

@media only screen and (min-width: 576px)  {
top: 45%;
}
`

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

const EndMessage = ({ className = '', suits, values }) => {
  const totalSuits = suits.length
  const totalValues = values.length
  return <div className={className + ' EndMessage'}>
    <p>VALUE MATCHES: {totalValues}</p>
    <p>SUIT MATCHES: {totalSuits}</p>
  </div>
}

const StyledCards = styled.div`
display: flex;
justify-content: space-between;
flex-direction: column;
align-items: center;
width: 650px;
max-width: 100vw;
@media only screen and (min-width: 576px)  {
  flex-direction: row;
}
`

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

  return <Container className={className}>
    <StyledCards>
      <Card className="LeftCard" {...leftCard}/>
      <Card className="RightCard"{...rightCard}/>
    </StyledCards>
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
    <p>{remaining ? remaining+' cards remaining' : 'Game ended'}</p>
  </Container>

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
