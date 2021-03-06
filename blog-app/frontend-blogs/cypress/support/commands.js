Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
      username, password
    }).then(({ body }) => {console.log(body)
      localStorage.setItem('loggedBlogsAppUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
  })
  
Cypress.Commands.add('createBlog', ({ title, author, url  }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url  },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogsAppUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})
Cypress.Commands.add('createUser', ({ name, username, password }) => {

  cy.request('POST', 'http://localhost:3003/api/testing/reset')
  const user = {
    name,
    username,
    password
  }
  cy.request('POST', 'http://localhost:3000/api/users/', user)

  cy.visit('http://localhost:3000')
})
