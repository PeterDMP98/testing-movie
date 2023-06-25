const supertest = require('supertest')
const app = require('../app')
const BASE_URL = '/api/v1/directors'
require('../models')
let directorId;


test("POST -> 'BASE_URL', should return status code 201", async () => {
    const director = {
        firstName: "Pancrasio",
        lastName: "Smith",
        nationality: "Estadounidence",
        image: "Pancracio img",
        birthday: '1960/10/25'
    }

    const res = await supertest(app)
    .post(BASE_URL)
    .send(director)

    directorId=res.body.id
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(director.firstName)
})

test("GET -> 'BASE_URL', should return status code 200", async()=> {
    const res = await supertest(app).get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("GET ONE -> 'BASE_URL/:id', should return status code 200", async()=> {
    const res = await supertest(app).get(`${BASE_URL}/${directorId}`)

    expect(res.status).toBe(200)
})

test("UPDATE -> 'BASE_URL/:id', should return status code 200", async()=> {
    const directorUpdate = {
        image:"img"
    }

    const res = await supertest(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(directorUpdate)

    expect(res.status).toBe(200)
    expect(res.body.image).toBe(directorUpdate.image)
})

test("DELETE -> 'BASE_URL/:id', should return status code 204", async()=> {
    const res = await supertest(app).delete(`${BASE_URL}/${directorId}`)

    expect(res.status).toBe(204)
})