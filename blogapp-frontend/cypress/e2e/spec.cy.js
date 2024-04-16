describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.get('#loginUsername').should('exist');
    cy.get('#loginPassword').should('exist');
    cy.contains('log in to application').should('exist');
    cy.contains('button', 'login').should('exist');

  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#loginUsername').type('mluukkai')
      cy.get('#loginPassword').type('salainen')
      cy.contains('button', 'login').should('exist').click()
      cy.contains('Matti Luukkainen logged in')
      
    })

    it('fails with wrong credentials', function() {
      cy.get('#loginUsername').type('wrong')
      cy.get('#loginPassword').type('salainen')
      cy.contains('button', 'login').click()
      cy.get('#error').should('exist');
    })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
     })
  
    it('A blog can be created', function() {
      cy.contains('button', 'new blog').click()
      cy.getByPlaceholder('give title..').type('blog title');
      cy.getByPlaceholder('give author..').type('pete');
      cy.getByPlaceholder('give url..').type('blog url');
      cy.get('#blogSubmit').click()
      cy.contains('a new blog added: blog title by pete')
    })
  })

  describe('When logged in and blog created', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.contains('button', 'new blog').click()
      cy.getByPlaceholder('give title..').type('blog title');
      cy.getByPlaceholder('give author..').type('pete');
      cy.getByPlaceholder('give url..').type('blog url');
      cy.get('#blogSubmit').click()
      cy.contains('a new blog added: blog title by pete')
     })
  
    it('A blog can be liked', function() {
      cy.contains('button', 'view').click()
      cy.contains('button', 'like').click()

    })
  })
})
})