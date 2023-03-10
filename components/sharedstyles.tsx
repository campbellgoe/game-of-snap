import styled from 'styled-components'

const Container = styled.div`
  padding: 0 0.5rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  min-height: 100vh;
`

const Cards = styled.div`
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

export { Container, Cards }
