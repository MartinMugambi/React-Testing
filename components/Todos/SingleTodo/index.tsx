//styles
import styles from '../../../styles/SingleTodo.module.css'

//components
import CustomLink from '../../link'

//type
import { TodoType } from '../../../pages'

//icons
import { TrashIcon } from '@heroicons/react/solid'
import { PencilAltIcon } from '@heroicons/react/solid'

interface SingleTodoComponentType {
	todo: TodoType
	handleDeleteTodo: (id: string) => void
}

const SingleTodo = (props: SingleTodoComponentType) => {
	const { todo, handleDeleteTodo } = props
	const defaultIconStyles = {
		cursor: 'pointer',
		width: '30px',
	}

	return (
		<div className={styles.singleTodo}>
			<div className={styles.todosActionsBox}>
				<h2>{todo.todoTitle}</h2>
				<section>
					<PencilAltIcon color='blue' style={defaultIconStyles} />
					<TrashIcon color='red' style={defaultIconStyles} onClick={() => handleDeleteTodo(todo.id)} />
				</section>
			</div>
			<div>{todo.todoDescription}</div>
			<CustomLink href='/' title='Back' color='white' bgColor='blue' />
		</div>
	)
}

export default SingleTodo
