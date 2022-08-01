import { UseFormHandleSubmit, FieldValues, UseFormRegister, FieldErrorsImpl, DeepRequired } from 'react-hook-form'

//styles
import styles from './style.module.css'

interface CreateTodoProps {
	register: UseFormRegister<FieldValues>
	errors: FieldErrorsImpl<DeepRequired<FieldValues>>
	handleFormSubmit: (data: any) => Promise<void>
	handleSubmit: UseFormHandleSubmit<FieldValues>
	handleCancel: () => void
	loading: boolean
}

const CreateTodo = (props: CreateTodoProps) => {
	const { register, errors, handleSubmit, handleFormSubmit, handleCancel, loading } = props
	return (
		<form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
			<input
				{...register('todoTitle', { required: true })}
				type='text'
				placeholder='Add todo title'
				name='todoTitle'
				id='todoTitle'
			/>
			{errors.todoTitle && <p className={styles.errorText}>Please provide a todo title</p>}
			<input
				{...register('todoDescription', { required: true })}
				type='text'
				placeholder='Add todo description'
				name='todoDescription'
				id='todoDescription'
			/>
			{errors.todoDescription && <p className={styles.errorText}>Please provide a todo description</p>}
			<input
				{...register('todoDate', { required: true })}
				type='date'
				placeholder='Select date'
				name='todoDate'
				id='todoDate'
			/>
			{errors.todoDate && <p className={styles.errorText}>Please provide a todo date</p>}
			<section className={styles.buttons}>
				<button className={styles.buttons__SubmitBtn} type='submit' disabled={loading}>
					{loading ? 'Submitting' : 'Submit'}
				</button>
				<button className={styles.buttons__CancelBtn} type='submit' color='black' onClick={handleCancel}>
					Cancel
				</button>
			</section>
		</form>
	)
}

export default CreateTodo
