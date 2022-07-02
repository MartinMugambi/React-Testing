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
}

const SingleTodo = (props: SingleTodoComponentType) => {
	const { todo } = props
	const defaultIconStyles = {
		cursor: 'pointer',
		width: '30px',
	}
	return (
		<div className={styles.singleTodo}>
			<div className={styles.todosActionsBox}>
				<h2>{todo.todoTitle}</h2>
				<div>
					<PencilAltIcon color='blue' style={defaultIconStyles} />
					<TrashIcon color='red' style={defaultIconStyles} />
				</div>
			</div>
			<div>{todo.todoDescription}</div>
			<CustomLink href='/' title='Back' color='white' bgColor='blue' />
		</div>
	)
}

export default SingleTodo
