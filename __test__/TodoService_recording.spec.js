import { Polly } from '@pollyjs/core'
import FSPersister from '@pollyjs/persister-fs'
import NodeHttpAdapter from '@pollyjs/adapter-node-http'
import { setupPolly } from 'setup-polly-jest'

import TodoService from '../TodoService.js'

const path = require('path')

Polly.register(NodeHttpAdapter)
Polly.register(FSPersister)

describe('TodoService recordig', () => {
  let context = setupPolly({
    adapters: ['node-http'],
    persister: 'fs',
    persisterOptions: {
      fs: {
        recordingsDir: path.resolve(__dirname, '__recordings__')
      }
    },
    recordFailedRequests: true
  })

  test('listTodos returns an todos when todos list is not empty', done => {
    TodoService.listTodos().then(data => {
      expect(data.length).toBe(5)
      expect(data[0].id).toBe(1)
      expect(data[0].done).toBe(true)
      expect(data[0].title).toBe('Make a todo server')

      done()
    })
  })

  test('getTodo returns todo when todo exists', done => {
    TodoService.getTodo(1).then(data => {
      expect(data.id).toBe(1)
      expect(data.done).toBe(true)
      expect(data.title).toBe('Make a todo server')

      done()
    })
  })

  test('getTodo throws error with 404 when todo not exists', done => {
    TodoService.getTodo(6).catch(error => {
      expect(error.response.status).toBe(404)
      expect(error.response.statusText).toBe('Not Found')

      done()
    })
  })

  test('createTodo returns the new created todo', done => {
    const payload = { description: 'Todo', done: false }

    TodoService.createTodo(payload).then(data => {
      expect(data.id).toBe(6)
      expect(data.description).toEqual(payload.description)
      expect(data.done).toEqual(payload.done)

      done()
    })
  })

  test('updateTodo returns the updated todo', done => {
    const payload = { description: 'Updated Todo', done: true }

    TodoService.updateTodo(1, payload).then(data => {
      expect(data.id).toBe(1)
      expect(data.description).toEqual(payload.description)
      expect(data.done).toEqual(payload.done)

      done()
    })
  })

  test('updateTodo returns 404 error when todo not exists', done => {
    const payload = { description: 'Updated Todo', done: true }

    TodoService.updateTodo(7, payload).catch(error => {
      expect(error.response.status).toBe(404)
      expect(error.response.statusText).toBe('Not Found')

      done()
    })
  })

  test('deleteTodo returns 200 when todo exists', done => {
    TodoService.deleteTodo(6).then(data => {
      expect(data).toBe(200)

      done()
    })
  })

  test('deleteTodo returns 404 error when todo not exists', done => {
    TodoService.deleteTodo(7).catch(error => {
      expect(error.response.status).toBe(404)
      expect(error.response.statusText).toBe('Not Found')

      done()
    })
  })
})