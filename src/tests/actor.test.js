const supertest = require('supertest')
const app = require('../app')
const BASE_URL = '/api/v1/actors'
require('../models')
let actorId;


test("POST -> 'BASE_URL', should return status code 201", async () => {
    const actor = {
        firstName: "Will",
        lastName: "Smith",
        nationality: "Estadounidence",
        image: "Will img",
        birthday: '1980/10/25'
    }

    const res = await supertest(app)
    .post(BASE_URL)
    .send(actor)

    actorId=res.body.id
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(actor.firstName)
})

test("GET -> 'BASE_URL', should return status code 200", async()=> {
    const res = await supertest(app).get(BASE_URL)

    console.log(res.body);
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("GET ONE -> 'BASE_URL/:id', should return status code 200", async()=> {
    const res = await supertest(app).get(`${BASE_URL}/${actorId}`)

    expect(res.status).toBe(200)
})

test("UPDATE -> 'BASE_URL/:id', should return status code 200", async()=> {
    const actorUpdate = {
        image:"wills"
    }

    const res = await supertest(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(actorUpdate)

    expect(res.status).toBe(200)
    expect(res.body.image).toBe(actorUpdate.image)
})

test("DELETE -> 'BASE_URL/:id', should return status code 204", async()=> {
    const res = await supertest(app).delete(`${BASE_URL}/${actorId}`)

    expect(res.status).toBe(204)
})