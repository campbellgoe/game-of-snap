import styled from "styled-components"
import Image from 'next/image'

const Card = styled(({ className = '', image, code }) => {
  return <div className={className + ' Card'} data-testid="card">
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

export default Card
