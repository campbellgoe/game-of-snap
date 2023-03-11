import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PickCard from '../components/PickCard';
import Card from '../components/Card';

describe("PickCard component", () => {
  it("should render a button with text \"Draw card\"", () => {
    render(<PickCard 
      onPickCard={newCard => {}}
      onEnded={() => {}}
      onRemaining={remaining => {}}
    />);
    const button = screen.getByText("Draw card")
    expect(button).toBeInTheDocument()
  
  })
})

describe("Card component", () => {
  it("should render a bordered space for a card if no image provided", () => {
    render(<Card className="TestCard" code="TestCard0" />)
    const card = screen.getByTestId('card')
    expect(card).toBeInTheDocument()

    expect(
      window
        .getComputedStyle(card)
        .getPropertyValue("border")
    ).toEqual('1px solid black');


    const image = card.querySelector("img")
    expect(image).not.toBeInTheDocument()

    
  })
  // TODO: this needs updating if using <picture> and <source> instead of <img>
  it("should render an image", () => {
    const imageSrc = 'data:image/gif;base64,R0lGODlhAQABAAAAACw='
    render(<Card className="TestCard" code="TestCard1" image={imageSrc}/>)
    const card = screen.getByTestId('card')
    const image =  card.querySelector("img")
    expect(image).toBeInTheDocument()
  })
})
