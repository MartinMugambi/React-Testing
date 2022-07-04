//types
import { TodoStateType } from '../pages'

export const fetcher = (url: string) => fetch(url).then(res => res.json())

export const addTodo = async (todo: TodoStateType) => {
	const addTodoEndPoint = '/api/todos/add-todo'
	const result = await fetch(addTodoEndPoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(todo),
	})

	return result
}

export const markTodoDone = async (isDone: boolean, id: string) => {
	const markTodoDoneEndPoint = `/api/todo/${id}`
	const result = await fetch(markTodoDoneEndPoint, {
		method: 'PUT',
		headers: {
			'Content-Type': 'text/plain',
		},
		body: JSON.stringify(isDone),
	})

	return result
}

export const deleteTodo = async (id: string) => {
	const deleteTodoEndPoint = `/api/todos/${id}`
	const result = await fetch(deleteTodoEndPoint, {
		method: 'DELETE',
	})

	return result
}
