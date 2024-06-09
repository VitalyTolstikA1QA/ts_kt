import axios from "axios";
import {expected99Post, expectedEmpty, postPost} from "../model/post";
import {user} from "../model/user";
import {StatusCode} from "../enum/statuses";

const baseUrl: string = 'https://jsonplaceholder.typicode.com';

describe('jsonplaceholder test suite', () => {
    test('Send GET Request to get all posts (/posts).', async () => {
        const response = await axios
            .get(`${baseUrl}/posts`)
        expect(response.status).toBe(StatusCode.SUCCESS)
        expect(response.headers['content-type']).toContain('application/json')
        const actualId: number[] = response.data.map((el: { id: number; }) => el.id)
        const sortedId: number[] = actualId.sort((a: number, b: number): number => a - b)
        expect(actualId).toEqual(sortedId)
    })
    test('Send GET request to get post with id=99 (/posts/99).', async () => {
        const response = await axios
            .get(`${baseUrl}/posts/99`)
        expect(response.status).toBe(StatusCode.SUCCESS)
        expect(response.data).toEqual(expected99Post)
        expect(response.data.body).not.toHaveLength(0)
    })
    test('Send GET request to get post with id=150 (/posts/150).', async () => {
        try {
            await axios
                .get(`${baseUrl}/posts/150`)
        } catch (error) {
            // @ts-ignore
            expect(error.response.status).toBe(StatusCode.NOT_FOUND)
            // @ts-ignore
            expect(error.response.data).toEqual(expectedEmpty)
        }
    })
    test('Send POST request to create post with userId=1 and random body and random title (/posts).', async () => {
        const response = await axios.post(`${baseUrl}/posts`, {
            postPost
        }, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        expect(response.status).toBe(StatusCode.SUCCESS_CREATED)
        expect(response.data.postPost.title).toBe(postPost.title)
        expect(response.data.postPost.body).toBe(postPost.body)
        expect(response.data.postPost.userId).toBe(postPost.userId)
    })
    test('Send GET request to get users (/users).', async () => {
        const response = await axios.get(`${baseUrl}/users`)
        expect(response.status).toBe(StatusCode.SUCCESS)
        expect(response.data.at(4)).toEqual(user)
    })
    test('Send GET request to get user with id=5 (/users/5).', async () => {
        const response = await axios.get(`${baseUrl}/users/5`)
        expect(response.status).toBe(StatusCode.SUCCESS)
        expect(response.data).toEqual(user)
    })
})