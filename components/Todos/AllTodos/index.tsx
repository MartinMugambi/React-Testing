//types
import { TodoType } from '../../../pages'

//nextjs
import Link from 'next/link'

interface AllTodosProps {
	todo: TodoType
}

const AllTodos = (props: AllTodosProps) => {
	const { id, todoTitle, todoDescription, todoDate } = props.todo
	return (
		<>
			{/*just for display*/}
			<Link href={'/' + id}>
				<a>
					<h2>{todoTitle}</h2>
				</a>
			</Link>
			<div>{todoDescription}</div>
			<div>{todoDate}</div>
		</>
	)
}

export default AllTodos
