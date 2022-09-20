const supertest = require('supertest')
const server = require('../../index')

describe('/GET works', () => {
  it('Sends a GET request to /', async () => {
    const response = await supertest(server).get('/')

    expect(response.status).toBe(200)
    expect(JSON.stringify(response.body)).toBe(JSON.stringify({ message: 'success' }))
  })
})
