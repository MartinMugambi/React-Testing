//types
import { TodoType } from '../../../pages'

interface AllTodosProps {
	todo: TodoType
}

const AllTodos = (props: AllTodosProps) => {
	const { id, todoTitle, todoDescription, todoDate } = props.todo
	return (
		<>
			{/*just for display*/}
			<div>{todoTitle}</div>
			<div>{todoDescription}</div>
			<div>{todoDate}</div>
		</>
	)
}

export default AllTodos
