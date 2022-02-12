import blogs from "../../src/services/blogs"

describe('Blog app', function() {
  beforeEach(function() {
    cy.createUser({ name: 'Tero Testiuuseri', username: 'ttestter', password: 'passwords_123' })
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')

  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('ttestter')
      cy.get('#password').type('passwords_123')
      cy.get('#login-butt').click()
      cy.contains('Tero Testiuuseri logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('WRONG')
      cy.get('#password').type('not_right')
      cy.get('#login-butt').click()
      cy.contains('wrong username or password')

    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username:'ttestter', password:'passwords_123' })
      cy.contains('Tero Testiuuseri logged in')
    })

    it('A blog can be created', function() {
      cy.contains('Create Blog').click()
      cy.get('#title_id').type('A title')
      cy.get('#author_id').type('Some author ')
      cy.get('#url_id').type('www.smtns.something')
      cy.get('#submit-butt').click()
      cy.contains('A new blog \'A title\'\' by Some author was added')
      cy.contains('A title Some author')
    })

    describe('When a blog is created', function(){
      beforeEach(function() {
        cy.createBlog({ title: 'A blog about testing', author: 'James the tester', url: 'www.test.com' })
      })

      it('A blog can be liked', function() {
        cy.contains('A blog about testing')
        cy.get('#view-butt').click()
        cy.get('#like-butt').click() // there is a bug here, needing two cliks
        cy.get('#like-butt').click() // of the like button to increase its value
        cy.contains('likes 1')
      })

      it('A blog can be removed', function() {
        cy.contains('A blog about testing')
        cy.get('#view-butt').click()
        cy.get('#remove-butt').click()
        cy.should('not.contain', 'A blog about testing')
        cy.should('not.contain', 'James the tester')
        cy.should('not.contain', 'www.test.com')
      })
    })
    describe('When many blogs are created', function(){
      beforeEach(function() {
        cy.createBlog({ title: 'A first blog about testing', author: 'James the tester', url: 'www.test.com' })
        cy.createBlog({ title: 'A second blog', author: 'James the tester', url: 'www.test.com' })
        cy.createBlog({ title: 'A third blog', author: 'James the tester', url: 'www.test.com' })
      })

      it.only('blogs in a list are in order by likes', function() {
        cy.get('#view-butt').click()
        cy.get('#view-butt').click()
        cy.get('#view-butt').click()
        cy.get('#like-butt').click() // there is a bug here, needing two cliks
        cy.get('#like-butt').click() // of the like button to increase its value
        cy.get('#like-butt').click()
        cy.get('#like-butt').click()
        cy.get('#like-butt').click()
        cy.get('#like-butt').click()
        cy.contains('A third')
          .contains('like').click()
        cy.contains('A third')
          .contains('like').click()
        cy.contains('A third')
          .contains('like').click()
        cy.contains('A third')
          .contains('like').click()
        cy.get('.blog').as('blogs').eq(0).contains('likes 3')
        cy.get('.blog').as('blogs').eq(1).contains('likes 2')
        cy.get('.blog').as('blogs').eq(2).contains('likes 0')
      })


    })

  })

})
