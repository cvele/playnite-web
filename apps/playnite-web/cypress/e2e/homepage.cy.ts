describe('Homepage', () => {
  it('Homepage Library', () => {
    cy.visit('/')
    cy.contains('h2', 'Library')
  })

  it(`Displays the "Playing" playlist
- Playlist shows games in a single, horizontally scrolling row.
- Playing playlist shows games that have the game state: "Playing".`, () => {
    cy.viewport(1366, 1080)
    cy.visit('/')
    cy.contains('h4', 'Playing').parents('[data-test="playlist"]')
    // TODO: Uncomment with implementation of #422
    // .compareSnapshot({
    //   name: 'homepage-playing-playlist',
    //   cypressScreenshotOptions: {
    //     blackout: ['[data-test="GameFigure"] img'],
    //   },
    // })
  })
})
