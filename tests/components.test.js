import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import PickCard from '../components/PickCard';
import Card from '../components/Card';
import MatchedMessage from '../components/MatchedMessage';
import EndMessage from '../components/EndMessage';

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

describe("MatchedMessage component", () => {
  it("should not render if there is no match between two cards", ()=>{
    render(<MatchedMessage leftCard={{ suit: 'Spades', value: "3" }} rightCard={{ suit: 'Diamonds', value: "4" }}/>)
    const suitMessage = screen.queryByTestId('suit-message')
    const valueMessage = screen.queryByTestId('value-message')
    expect(suitMessage).not.toBeInTheDocument()
    expect(valueMessage).not.toBeInTheDocument()
  })

  it("should render \"SNAP SUIT!\" if there is a match for suit between the two cards", ()=>{
    render(<MatchedMessage leftCard={{ suit: 'Diamonds', value: "3" }} rightCard={{ suit: 'Diamonds', value: "4" }}/>)
    const suitMessage = screen.queryByTestId('suit-message')
    expect(suitMessage).toBeInTheDocument()
    expect(suitMessage.textContent).toBe('SNAP SUIT!')
  })

  it("should render \"SNAP VALUE!\" if there is a match for value between the two cards", ()=>{
    render(<MatchedMessage leftCard={{ suit: 'Hearts', value: "5" }} rightCard={{ suit: 'Clubs', value: "5" }}/>)
    const valueMessage = screen.queryByTestId('value-message')
    expect(valueMessage).toBeInTheDocument()
    expect(valueMessage.textContent).toBe('SNAP VALUE!')
  })
})

describe("EndMessage component", ()=>{
  it("should render the total VALUE and SUIT matches", () => {
    render(<EndMessage totalSuits={14} totalValues={4}/>)
    const valueMatches = screen.getByText('VALUE MATCHES: 4')
    expect(valueMatches).toBeInTheDocument()
    const suitMatches = screen.getByText('SUIT MATCHES: 14')
    expect(suitMatches).toBeInTheDocument()
  })
})
