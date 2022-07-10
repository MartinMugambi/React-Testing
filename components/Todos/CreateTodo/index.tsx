//components
import Button from '../../button'
import Input from '../../input'

// //react-hook-form
// import { UseFormRegister, FieldValues, UseFormHandleSubmit, SubmitHandler } from 'react-hook-form'

//styles
import styles from '../../../styles/Home.module.css'

//global context
import { useErrors } from '../../../pages/context/appContext'

interface CreateTodoProps {
	handleSubmit: (event?: React.FormEvent<HTMLFormElement>) => void
	handleCancel: (event?: React.FormEvent<HTMLFormElement>) => void
	handleChange: (event: React.FormEvent<HTMLInputElement>) => void
}

const CreateTodo = (props: CreateTodoProps) => {
	const { handleChange, handleSubmit, handleCancel } = props
	const { formErrors, loading } = useErrors()

	//destructure formErrors
	const { title, description, date } = formErrors
	return (
		<form className={styles.form}>
			<Input type='text' placeholder='Add todo title' name='todoTitle' onChange={handleChange} />
			{title && <p className={styles.errorText}>Please provide a todo title</p>}
			<Input type='text' placeholder='Add todo description' name='todoDescription' onChange={handleChange} />
			{description && <p className={styles.errorText}>Please provide a todo description</p>}
			<Input type='date' placeholder='Select date' name='todoDate' onChange={handleChange} />
			{date && <p className={styles.errorText}>Please provide a todo date</p>}
			<section className={styles.buttons}>
				{loading ? (
					<Button
						title='Submitting...'
						type='submit'
						bgColor='blue'
						color='white'
						onClick={handleSubmit}
						disabled={loading}
					/>
				) : (
					<Button title='Submit' type='submit' bgColor='blue' color='white' onClick={handleSubmit} />
				)}
				<Button title='Cancel' type='button' bgColor='#d5d5d5' color='black' onClick={handleCancel} />
			</section>
		</form>
	)
}

export default CreateTodo
