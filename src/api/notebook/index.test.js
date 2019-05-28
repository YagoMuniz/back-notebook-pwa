import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import routes, { Notebook } from '.'
import User from '../user'

const app = () => expresss(apiRoot, routes)

beforeEach(async () => {
    note1 = await Notebook.create(
        { title: 'title of notebook', description: 'description of notebook',
        pages: ['1', '2'], number_of_pages: 2})
        user1 = await User.create({ name: 'user1', email: 'a@gmail.com', password: '123456' })
});

test('GET /notebook 200', async () => {
    const { status, body } = await request(app)
        .get(apiRoot)
        .query({acess_token: user1})
    expect(status).toBe(200)
    expect(Array.isArray(body)).toBe(true)
})