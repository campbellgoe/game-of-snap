import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PickCard from '../components/PickCard';

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