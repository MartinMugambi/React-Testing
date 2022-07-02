import { TodoType } from '../../../pages'

interface SingleTodoComponentType {
	todo: TodoType
}

const SingleTodo = (props: SingleTodoComponentType) => {
	const { todo } = props
	return (
		<div>
			<div>{todo.todoTitle}</div>
			<div>{todo.todoDescription}</div>
		</div>
	)
}

export default SingleTodo
