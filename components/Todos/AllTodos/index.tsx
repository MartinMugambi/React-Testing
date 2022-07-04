//types
import { TodoType } from '../../../pages'

//nextjs
import Link from 'next/link'

//reactjs
import { useState } from 'react'

//styles
import styles from '../../../styles/Alltodo.module.css'

//icons
import { PencilAltIcon } from '@heroicons/react/solid'
import { TrashIcon } from '@heroicons/react/solid'

interface AllTodosProps {
	todo: TodoType
	handleTodoDone: (id: string, checked: boolean) => void
	handleDeleteTodo: (id: string) => void
}

const AllTodos = (props: AllTodosProps) => {
	const { id, todoTitle, todoDescription, todoDate, isDone } = props.todo
	const { handleTodoDone, handleDeleteTodo } = props
	const [checked, setIsChecked] = useState(isDone)

	return (
		<section className={styles.container}>
			<section className={styles.first}>
				<section className={styles.second}>
					<input
						type='checkbox'
						defaultChecked={checked}
						id='check'
						name='check'
						className={styles.checkbox}
						onChange={() => {
							setIsChecked(!checked)
							handleTodoDone(id, !checked)
						}}
					/>
					<Link href={'/' + id}>
						<a>
							{checked ? (
								<s>
									<h3>{todoTitle}</h3>
								</s>
							) : (
								<h3>{todoTitle}</h3>
							)}
						</a>
					</Link>
				</section>
				<section className={styles.third}>
					<PencilAltIcon width={30} color='blue' />
					<TrashIcon width={30} color='red' onClick={() => handleDeleteTodo(id)} />
				</section>
			</section>

			<section className={styles.fourth}>
				<div>{todoDescription}</div>
				<div>{todoDate}</div>
			</section>
		</section>
	)
}

export default AllTodos
