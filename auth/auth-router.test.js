const request = require('supertest');

const server = require('../api/server.js');

describe('auth-route.js', () => {
   
    it("register should return 201 status", async () => {

        random = Math.random().toString();
        const postRes = await request(server)
            .post('/api/auth/register')
            .send({username: random, password: 'asdasdsad'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)

            console.log(postRes.body);
        
    })
    it("register should return an object", async () => {
        const postRes = await request(server)
        .post('/api/auth/register')
        .send({username: 'aaroneld', password: 'asdasdsad'})
        .set('Accept', 'application/json')

        expect(typeof(postRes.body)).toBe('object')
        
    })
    it("login should return 200 status", async () => {
        const getRes = await request(server)
        .post('/api/auth/login')
        .send({username: 'aaroneld', password: 'asdasdsad'})
        .set('Accept', 'application/json');

        expect(getRes.status).toEqual(200);
        
    })
    it("login should return an object", async () => {
        const getRes = await request(server)
        .post('/api/auth/login')
        .send({username: 'aaroneld', password: 'asdasdsad'})
        .set('Accept', 'application/json');


        expect(typeof(getRes.body)).toBe('object')
        
    })
})