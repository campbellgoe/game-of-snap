
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Card from '../components/Card'
import EndMessage from '../components/EndMessage'
import MatchedMessage from '../components/MatchedMessage'
import PickCard from '../components/PickCard'
import { Container, Cards } from '../components/sharedstyles'

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
    <Cards>
      <Card className="LeftCard" {...leftCard}/>
      <Card className="RightCard"{...rightCard}/>
    </Cards>
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
    {showEndMessage && <EndMessage totalSuits={suits.length} totalValues={values.length}/>}
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
