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
