

describe('Selectors tests', () => {

  beforeEach(() => {
    cy.visit('https://devexpress.github.io/testcafe/example/')
  })

    
  it('Initial selectors work - select', () => {
    cy.get('[data-testid="preferred-interface-select"]')
      .select('JavaScript API')
  })

  it('Initial selectors work - dragNdrop', () => {
    cy.get('[data-testid="tried-testcafe-checkbox"]').click();
    cy.get('[id="slider"]').invoke('css', 'width').then($width => {
      const expectedDragValues = [2,3,4,5,6,7,8,9];
      expectedDragValues.forEach(num => {
        const movePixelValue = Math.floor(parseInt($width) / 9) * num

        cy.get('[id="slider"] span').trigger('mousedown', {
          which: 1,
          pageX: 0,
          pageY: 0,
        })
        cy.get('[id="slider"] span').trigger('mousemove', {
          which: 1,
          pageX: movePixelValue,
          pageY: 0,
        })
        cy.get('[id="slider"] span').trigger('mouseup')

        //cleanup 
        cy.get('[id="slider"] span').trigger('mousedown', {
          which: 1,
          pageX: 0,
          pageY: 0,
        })
        cy.get('[id="slider"] span').trigger('mousemove', {
          which: 1,
          pageX: -movePixelValue,
          pageY: 0,
        })
        cy.get('[id="slider"] span').trigger('mouseup')
      })
    })
  })

  it.only('Initial selectors work - dragNdrop via lib', () => {
    cy.get('[data-testid="tried-testcafe-checkbox"]').click();
    const expectedDragValues = [2,3,4,5,6,7,8,9,10];
    expectedDragValues.forEach(num => {
      cy.get('[id="slider"] span').drag(`[class="slider-value"]:nth-of-type(${num})`)
    })
  })

})