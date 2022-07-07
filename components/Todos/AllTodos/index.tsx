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

//components
import Input from '../../input'
import Button from '../../button'

interface AllTodosProps {
	todo: TodoType
	// editTitle: boolean
	idOnEdit: string | null
	isOnEdit: boolean
	handleTodoDone: (id: string, checked: boolean) => void
	handleUpdateTodoTitle: (idToEdit: string, updatedTodoTitle?: string) => void
	handleDeleteTodo: (id: string) => void
}

const AllTodos = (props: AllTodosProps) => {
	const { id, todoTitle, todoDescription, todoDate, isDone } = props.todo
	const { isOnEdit, idOnEdit, handleTodoDone, handleUpdateTodoTitle, handleDeleteTodo } = props
	const [checked, setIsChecked] = useState(isDone)
	const [updatedTodoTitleValue, setUpdatedTodoTitleValue] = useState(todoTitle)

	const handleUpdateValue = (e: React.FormEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget
		console.log('FROM  handleUpdateValue() update with', value)
		setUpdatedTodoTitleValue(value)
	}

	return (
		<section className={styles.container}>
			<section className={styles.first}>
				<section className={styles.second}>
					{isOnEdit && id === idOnEdit ? (
						'' //hide the checkbox if this item is on edit 😁
					) : (
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
					)}
					<Link href={'/' + id}>
						<a>
							{checked ? (
								<s>
									<h3>{todoTitle}</h3>
								</s>
							) : isOnEdit && id === idOnEdit ? (
								'' //hide the todo's title if this item is on edit 😁
							) : (
								<h3>{todoTitle}</h3>
							)}
						</a>
					</Link>
					{isOnEdit && id === idOnEdit ? ( //show the input field for the todo title if this item is on edit 😁
						<div>
							<Input
								type='text'
								placeholder='Update todo title'
								name='todoTitle'
								value={updatedTodoTitleValue}
								onChange={e => {
									console.log('update with: ', e.currentTarget.value)
									handleUpdateValue(e)
								}}
							/>
							<div className={styles.update__Button}>
								{updatedTodoTitleValue !== todoTitle && (
									<Button
										type='button'
										title='Update'
										bgColor='rgb(30, 128, 30)'
										color='#fff'
										onClick={() => handleUpdateTodoTitle(id, updatedTodoTitleValue)}
									/>
								)}
							</div>
						</div>
					) : (
						''
					)}
				</section>
				<section className={styles.third}>
					<PencilAltIcon width={30} color='blue' onClick={() => handleUpdateTodoTitle(id)} />
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
