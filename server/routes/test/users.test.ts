import request from "supertest";
import dotenv from 'dotenv';
import app from '../../index';

dotenv.config();
// admin|manager|caregiver
const testAdminUser = {
    name: `name${Math.random() * 1000}`,
    username: `username${Math.random() * 1000}`,
    password: `123456`,
    email: `name${Math.random() * 1000}@123.com`,
    phone_number: `123456789`,
    role: 'admin'
}
let userId = '';
const prefix = '/users';

describe(`Router Users`, () => {
    it(`POST ${prefix} - should create new user`, async () => {
        return request(app)
            .post(prefix)
            .send(testAdminUser)
            .expect(201)
            .then(({ body }) => {
                userId = body._id;
            })
    });


    it(`GET ${prefix} - should get all users`, async () => {
        return request(app)
            .get(`${prefix}/${userId}`)
            .expect(200)
    });

    it(`GET ${prefix}/:id - should get a user`, async () => {
        return request(app)
            .get(`${prefix}/${userId}`)
            .expect(200)
    });
});