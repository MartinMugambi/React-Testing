//components
import Button from '../../button'
import Input from '../../input'

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
	const { formErrors, loading, setLoading } = useErrors()

	//destructure formErrors
	const { title, description, date } = formErrors
	return (
		<form className={styles.form}>
			<Input type='text' placeholder='Add todo title' name='todoTitle' onChange={handleChange} />
			{title && <p style={{ color: 'red', alignSelf: 'flex-start', marginLeft: '25px' }}>Please provide a todo title</p>}
			<Input type='text' placeholder='Add todo description' name='todoDescription' onChange={handleChange} />
			{description && (
				<p style={{ color: 'red', alignSelf: 'flex-start', marginLeft: '25px' }}>Please provide a todo description</p>
			)}
			<Input type='date' placeholder='Select date' name='todoDate' onChange={handleChange} />
			{date && <p style={{ color: 'red', alignSelf: 'flex-start', marginLeft: '25px' }}>Please provide a todo date</p>}
			<section className={styles.buttons}>
				{loading ? (
					<Button title='Submit...' type='submit' bgColor='blue' color='white' onClick={handleSubmit} />
				) : (
					<Button title='Submit' type='submit' bgColor='blue' color='white' onClick={handleSubmit} />
				)}
				<Button title='Cancel' type='button' bgColor='grey' color='black' onClick={handleCancel} />
			</section>
		</form>
	)
}

export default CreateTodo
