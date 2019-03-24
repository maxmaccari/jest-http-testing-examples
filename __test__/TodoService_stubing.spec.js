import TodoService from '../TodoService.js'
import nock from 'nock'

describe('TodoService stubing', () => {
  const http = nock('http://0.0.0.0:3000')
    .defaultReplyHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
    })

  beforeEach(() => {
    nock.cleanAll()
  })

  test('listTodos returns an empty array when todos list is empty', done => {
    http.get('/todos').reply(200, [])

    TodoService.listTodos().then(data => {
      expect(data).toEqual([])

      done()
    })
  })

  test('listTodos returns an todos when todos list is not empty', done => {
    const todos = [
      {id: 1, description: 'Todo 1', done: true},
      {id: 2, description: 'Todo 2', done: false}
    ]
    http.get('/todos').reply(200, todos)

    TodoService.listTodos().then(data => {
      expect(data).toEqual(todos)

      done()
    })
  })

  test('getTodo returns todo when todo exists', done => {
    const todo = { id: 1, description: 'Todo', done: false }
    http.get('/todos/1').reply(200, todo)

    TodoService.getTodo(1).then(data => {
      expect(data).toEqual(todo)

      done()
    })
  })

  test('getTodo throws error with 404 when todo not exists', done => {
    const todo = { id: 1, description: 'Todo', done: false }
    http.get('/todos/1').reply(404, {})

    TodoService.getTodo(1).catch(error => {
      expect(error.response.status).toBe(404)
      expect(error.response.statusText).toBe('Not Found')

      done()
    })
  })

  test('createTodo returns the new created todo', done => {
    const payload = { description: 'Todo', done: false }
    http.post('/todos', payload).reply(201, {...payload, id: 1})

    TodoService.createTodo(payload).then(data => {
      expect(data.id).toBe(1)
      expect(data.description).toEqual(payload.description)
      expect(data.done).toEqual(payload.done)

      done()
    })
  })

  test('updateTodo returns the updated todo', done => {
    const payload = { description: 'Updated Todo', done: true }
    http.options('/todos/1').reply(200)
        .put('/todos/1', payload).reply(200, {...payload, id: 1})

    TodoService.updateTodo(1, payload).then(data => {
      expect(data.id).toBe(1)
      expect(data.description).toEqual(payload.description)
      expect(data.done).toEqual(payload.done)

      done()
    })
  })

  test('updateTodo returns 404 error when todo not exists', done => {
    const payload = { description: 'Updated Todo', done: true }
    http.options('/todos/1').reply(200)
        .put('/todos/1', payload).reply(404)

    TodoService.updateTodo(1, payload).catch(error => {
      expect(error.response.status).toBe(404)
      expect(error.response.statusText).toBe('Not Found')

      done()
    })
  })

  test('deleteTodo returns 200 when todo exists', done => {
    http
      .options('/todos/1').reply(200)
      .delete('/todos/1').reply(200)

    TodoService.deleteTodo(1).then(data => {
      expect(data).toBe(200)

      done()
    })
  })

  test('deleteTodo returns 404 error when todo not exists', done => {
    http.options('/todos/1').reply(200)
        .delete('/todos/1').reply(404)

    TodoService.deleteTodo(1).catch(error => {
      expect(error.response.status).toBe(404)
      expect(error.response.statusText).toBe('Not Found')

      done()
    })
  })
})