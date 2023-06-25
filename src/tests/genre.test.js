const supertest = require('supertest')
const app = require('../app');
const BASE_URL = '/api/v1/genres'
require('../models')

let genreId;

// POST /genres
test("POST -> 'BASE_URL', should return status code 201", async () => {

    const genre = {
        name: "Accion",
    }

    const res = await supertest(app)
        .post(BASE_URL)
        .send(genre)

    genreId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(genre.name)

})

//GET/genres

test("GET -> 'BASE_URL', should return status code 200", async() => {
    const res = await supertest(app).get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

//GET-ONE/genres

test("GET ONE -> 'BASE_URL/:id', should return status code 200", async () => {
    const res = await supertest(app).get(`${BASE_URL}/${genreId}`)

    expect(res.status).toBe(200)
})

//PUT/genres/:id

test("PUT -> 'BASE_URL/:id', should return status code 200", async () => {
    const genreUpdate = {
        name: "suspenso"
    }

    const res = await supertest(app)
        .put(`${BASE_URL}/${genreId}`)
        .send(genreUpdate)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe(genreUpdate.name)
})


//DELETE/genres/:id

test("DELETE -> 'BASE_URL', should return status code 204", async () => {
    const res = await supertest(app).delete(`${BASE_URL}/${genreId}`)

    expect(res.status).toBe(204)
})