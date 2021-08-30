/// <reference types="cypress" />
describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  it('Successfully logs in with the correct credentials', () => {
    cy.get('input[name="username"]').clear().type('linlinisCool')
    cy.get('input[name="password"]').clear().type('alice123')
    cy.get('input.submit-input').click()

    //Assert login is successful and that the posts page is loaded
    cy.url().should('eq', 'http://localhost:3000/posts')
    cy.contains('Create new post')
    
    //Logout
    cy.get('button.logout-btn').click()
    cy.url().should('eq', 'http://localhost:3000/login')
    // cy.wait(500)
    // cy.contains('Username')
    // cy.contains('Password')
  })

  it('Does not allow the user to log in with incorrect credentials', () => {
    //Incorrect username test
    cy.get('input[name="username"]').clear().type('linlinisTooCool')
    cy.get('input[name="password"]').clear().type('alice123')
    cy.get('input.submit-input').click()
    cy.url().should('eq', 'http://localhost:3000/login')

    //Incorrect password test
    cy.get('input[name="username"]').clear().type('linlinisCool')
    cy.get('input[name="password"]').clear().type('alice1234')
    cy.get('input.submit-input').click()
    cy.url().should('eq', 'http://localhost:3000/login')
  })

  it('Successfully makes a post', () => {
    cy.get('input[name="username"]').clear().type('linlinisCool')
    cy.get('input[name="password"]').clear().type('alice123')
    cy.get('input.submit-input').click()
    cy.wait(3000)

    //Assert login is successful and that the posts page is loaded
    
    cy.url().should('eq', 'http://localhost:3000/posts')
    cy.contains('Create new post')
    
    //Enter the required post info and submit
    cy.get('input[name="picture"]').clear().type('https://cdn.myanimelist.net/s/common/uploaded_files/1449036552-e43b278971b7b3795e449263de259b1f.png')
    cy.get('input[name="text_content"]').clear().type('The food in One Piece looks so good!')
    cy.get('button').contains('add address').click()
    cy.get('input[name="address"]').clear().type('Wano')
    cy.get('input.new_post_submit').click()

    //Assert Post is created successfully
    cy.get('img.post_picture[src="https://cdn.myanimelist.net/s/common/uploaded_files/1449036552-e43b278971b7b3795e449263de259b1f.png"]').eq(0).click()
    cy.get('img.post_picture[src="https://cdn.myanimelist.net/s/common/uploaded_files/1449036552-e43b278971b7b3795e449263de259b1f.png"]').eq(0).siblings('div.post_info').find('span').contains('The food in One Piece looks so good!')

    //Logout
    cy.get('button.logout-btn').click()
    cy.url().should('eq', 'http://localhost:3000/login')
    cy.contains('Username')
    cy.contains('Password')
  })
})
