//types
import { TodoStateType } from '../pages'

export const fetcher = (url: string) => fetch(url).then(res => res.json())

export const getASingleTodo = async (id: string) => {
	const getSingleTodoEndpoint = `/api/todos/${id}`
	const result = await fetch(getSingleTodoEndpoint, {
		method: 'GET',
	})

	return result
}

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

export const updateTodoTitle = async (id: string, updatedTodoTitle: string) => {
	const updateTodoTitleEndpoint = `/api/todos/${id}`
	const result = await fetch(updateTodoTitleEndpoint, {
		method: 'PUT',
		headers: {
			'Content-Type': 'text/plain',
		},
		body: updatedTodoTitle,
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
