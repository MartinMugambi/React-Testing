//components
import Button from '../../button'
import Input from '../../input'

//styles
import styles from '../../../styles/Home.module.css'

interface CreateTodoProps {
	handleSubmit: (event?: React.FormEvent<HTMLFormElement>) => void
	handleCancel: (event?: React.FormEvent<HTMLFormElement>) => void
	handleChange: (event: React.FormEvent<HTMLInputElement>) => void
}

const CreateTodo = (props: CreateTodoProps) => {
	const { handleChange, handleSubmit, handleCancel } = props

	return (
		<form className={styles.form}>
			<Input type='text' placeholder='Add todo title' name='todoTitle' onChange={handleChange} />
			<Input type='text' placeholder='Add todo description' name='todoDescription' onChange={handleChange} />
			<Input type='date' placeholder='Select date' name='todoDate' onChange={handleChange} />
			<section className={styles.buttons}>
				<Button title='Submit' type='submit' bgColor='blue' color='white' onClick={handleSubmit} />
				<Button title='Cancel' type='button' bgColor='grey' color='black' onClick={handleCancel} />
			</section>
		</form>
	)
}

export default CreateTodo
