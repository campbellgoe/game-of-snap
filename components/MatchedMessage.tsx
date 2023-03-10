import { useMemo } from "react"
import styled from "styled-components"

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

export default MatchedMessage
