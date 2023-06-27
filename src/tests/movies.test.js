const supertest = require('supertest')
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
const BASE_URL = '/api/v1/movies'
require('../models')
let movieId;


test("POST -> 'BASE_URL', should return status code 201", async () => {
    const movie = {
        name: "Bellesa Inesperada",
        image: "image Bellesa inesperada",
        synopsis: "Una visita del amor, la muerte y el tiempo ",
        releaseYear: 2018,
    }

    const res = await supertest(app)
        .post(BASE_URL)
        .send(movie)

    movieId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(movie.firstName)
})

test("GET -> 'BASE_URL', should return status code 200", async () => {
    const res = await supertest(app).get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("GET ONE -> 'BASE_URL/:id', should return status code 200", async () => {
    const res = await supertest(app).get(`${BASE_URL}/${movieId}`)

    expect(res.status).toBe(200)
})

test("UPDATE -> 'BASE_URL/:id', should return status code 200", async () => {
    const movieUpdate = {
        releaseYear: 2019
    }

    const res = await supertest(app)
        .put(`${BASE_URL}/${movieId}`)
        .send(movieUpdate)

    expect(res.status).toBe(200)
    expect(res.body.releaseYear).toBe(movieUpdate.releaseYear)
})


/*POST /movies/:id/actors */
test("POST 'BASE_URL/:id/actors', should return status code 200", async () => {
    const actorBody = {
        firstName: "Will",
        lastName: "Smith",
        nationality: "Estadounidence",
        image: "Will img",
        birthday: '1980/10/25'
    }

    const actor = await Actor.create(actorBody)

    const res = await supertest(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send([actor.id])

    console.log(actor.body);
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await actor.destroy()
})

//POST /movies/:id/directors
test("POST 'BASE_URL/:id/direcctors', should return status code 200", async () => {
    const directorBody = {
        firstName: "Pancrasio",
        lastName: "Smith",
        nationality: "Estadounidence",
        image: "Pancracio img",
        birthday: '1960/10/25'
    }

    const director = await Director.create(directorBody)

    const res = await supertest(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send([director.id])

    console.log(director.body);
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await director.destroy()
})

//POST /movies/:id/genres
test("POST 'BASE_URL/:id/genres', should return status code 200", async () => {
    const genreBody = {
        name: "Accion",
    }

    const genre = await Genre.create(genreBody)

    const res = await supertest(app)
    .post(`${BASE_URL}/${movieId}/genres`)
    .send([genre.id])

    console.log(genre.body);
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await genre.destroy()
})

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await supertest(app).delete(`${BASE_URL}/${movieId}`)

    expect(res.status).toBe(204)
})