let textAreaId = '';

describe('Selectors tests', () => {
  beforeEach(() => {
    cy.visit('https://devexpress.github.io/testcafe/example/')
    cy.get('[data-testid="comments-area"]')
      .invoke('attr', 'id')
      .then($id => {
        textAreaId = $id
        expect($id).to.equal('comments')
      })
    cy.get('[id="developer-name"]')
      .invoke('attr', 'data-testid')
      .as('inputDataTestValue')
  })

  it('Initial selectors work - checkboxes', () => {
    cy.get('[data-testid="windows-radio"]')
      .should('not.be.checked')
      .click()
      .should('be.checked')
    cy.contains('fieldset p label', 'MacOS')
      .find('input')
      .should('not.be.checked')
      .click({force: true})
      .should('be.checked')

    cy.get('div[class*="col-2"]')
      .children('fieldset')
      .eq(0)
      .children('p')
      .eq(1)
      .find('input')
      .should('be.checked')

    cy.focused()  

    cy.get('[data-testid="windows-radio"]')
      .closest('p')
  })

  it('Initial selectors work - textarea', () => {
    // cy.get('[data-testid="comments-area"]')
    //   .should('be.visible')
    //   .invoke('hide')
    //   .should('not.be.visible')
    cy.get('[data-testid="tried-testcafe-checkbox"]').click()
    const expectedText = 'This is some plain text '.repeat(4);
    cy.get(`[id=${textAreaId}]`)
      .type(expectedText)
      .should('have.value', expectedText)
    cy.get(`[id=${textAreaId}]`)
      .then($el => {
        console.log($el[0])
        expect($el[0].value).to.equal(expectedText)
      })
    cy.title().should('equal', 'TestCafe Example Page')
  })

  it('Initial selectors work - input',  function () {
    cy.get(`[data-testid=${this.inputDataTestValue}]`)
      .as('inputSelector')
    cy.get('@inputDataTestValue').then((dataTest) => {
      cy.get(`[data-testid=${dataTest}]`)
        .type('Andrii')
        .should('have.value', 'Andrii')
    })


    cy.contains('fieldset legend', 'How would')
      .invoke('text')
      .then($text => {
        cy.log($text);
      })


    // // option 1
    // const arrIndexes = [0,1,2,3,4]
    // arrIndexes.forEach(ind => {
    //     cy.get('[class*="col-1"] fieldset p input')
    //       .eq(ind)
    //       .should('not.be.checked')
    //       .click()
    //       .should('be.checked')
    // })

    // option 2 - better
    cy.get('[class*="col-1"] fieldset p input')
      .each((value, index) => {
        index % 2 === 0 
          ? cy.get(value).click().should('be.checked') 
          : cy.get(value).should('not.be.checked')
      })


    cy.get('[class*="col-1"] fieldset p input')
      .click({multiple: true}) 
            
    cy.get('[class*="col-1"] fieldset:nth-of-type(2)')
      .within(() => {
        cy.get('input').click({multiple: true}) 
      })

  })

  it('Basic HOMEWORK login', () => {
    cy.visit('https://qauto.forstudy.space/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto'
      }
    })
  })
})

// const LOGIN_PAGE_SELECOTRS = {
//     emailInput: '[data-test="email-input"]',
// }

// cy.get(LOGIN_PAGE_SELECOTRS.emailInput).

describe('Selectors tests - slider', {testIsolation: false}, () => {
  beforeEach(() => {
    cy.visit('https://devexpress.github.io/testcafe/example/')
  })
  
  it('displays two todo items by default', () => {
    console.log(process.env.ENV_VAR);
    cy.log()
    cy.get('[for="tried-test-cafe"]').click();
    const index = 1;
    cy.get('[id="slider"] span')
      .drag(`[class="slider-value"]:nth-of-type(${index})`);
    cy.task('log', (((index-1)/9)*100).toFixed(index % 10 === 0 || index === 1 ?  0 : 4))
    const expectedStyle = (((index-1)/9)*100).toFixed(index % 10 === 0 || index === 1 ?  0 : 4)    
    cy.get('[id="slider"] span')
      .should('have.attr', 'style', `left: ${expectedStyle}%;`);
    const expectedText = 'This is some really longText'.repeat(5)    
    cy.get('[data-testid="comments-area"]').type(expectedText, {delay: 0})
    cy.get('[data-testid="comments-area"]').should('have.value', expectedText)
    cy.get('[data-testid="preferred-interface-select"]').select('Both')
    cy.get('[data-testid="macos-radio"]').click().should('be.checked')
    const idsArray = [0, 1, 2, 3, 4]
    idsArray.forEach((id) => {
      id%2===0 ? 
        cy.get('fieldset:not([id="tried-section"]) [data-testid*="-checkbox"]').eq(id).click().should('be.checked') : 
        cy.get('fieldset:not([id="tried-section"]) [data-testid*="-checkbox"]').eq(id).should('not.be.checked')
    })
    cy.get('[data-testid="name-input"]').should('not.have.value')
    cy.get('[data-testid="populate-button"]').click()
    cy.get('[data-testid="name-input"]').should('have.value', 'Peter Parker')
    cy.get('[data-testid="name-input"]').type('{selectAll}{del}').type('Andrii')
    cy.get('[data-testid="name-input"]').should('have.value', 'Andrii').type('{enter}')
    cy.get('h1[data-testid="thank-you-header"]').should('be.visible').should('have.text', 'Thank you, Andrii!')
  })
})