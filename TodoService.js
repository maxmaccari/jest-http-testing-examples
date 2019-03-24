import axios from 'axios'

const http = axios.create({
  baseURL: 'http://0.0.0.0:3000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  listTodos() {
    return http.get('/todos').then(res => res.data)
  },

  getTodo(id) {
    return http.get(`/todos/${id}`).then(res => res.data)
  },

  createTodo(todo) {
    return http.post('/todos', todo).then(res => res.data)
  },

  updateTodo(id, todo) {
    return http.put(`/todos/${id}`, todo).then(res => res.data)
  },

  deleteTodo(id) {
    return http.delete(`/todos/${id}`).then(res => res.status)
  }
}