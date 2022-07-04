//reactjs
import { useState } from 'react'

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
	handleTodoDone: (id: string, checked: boolean) => void
	handleDeleteTodo: (id: string) => void
}

const SingleTodo = (props: SingleTodoComponentType) => {
	const { todo, handleTodoDone, handleDeleteTodo } = props
	const defaultIconStyles = {
		cursor: 'pointer',
		width: '30px',
	}
	const [checked, setIsChecked] = useState(todo.isDone)

	return (
		<div className={styles.singleTodo}>
			<div className={styles.todosActionsBox}>
				<section className={styles.todoTitleSection}>
					<input
						type='checkbox'
						defaultChecked={checked}
						id='check'
						name='check'
						className={styles.checkbox}
						onChange={() => {
							setIsChecked(!checked)
							handleTodoDone(todo.id, !checked)
						}}
					/>
					{checked ? (
						<s>
							<h3>{todo.todoTitle}</h3>
						</s>
					) : (
						<h3>{todo.todoTitle}</h3>
					)}
				</section>
				<section className={styles.iconsContainer}>
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
