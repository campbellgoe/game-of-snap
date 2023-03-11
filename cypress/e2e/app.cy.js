describe('Game of snap app', () => {
  it('should render no cards in placeholders and a button when clicked twice adds two cards to the screen', () => {
    cy.visit('http://localhost:3000/')
    const button = cy.get('button')
    button.contains('Draw card')
    cy.screenshot('no cards')
    button.click()
    button.click()
    cy.wait(2000)
    cy.screenshot('two cards')
  })
})