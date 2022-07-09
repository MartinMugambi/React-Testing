//react
import React, { useState } from 'react'

//nextjs
import { GetStaticProps } from 'next'

//mongodb
import { MongoClient } from 'mongodb'

//swr
import useSWR, { useSWRConfig } from 'swr'

//react-hook-form
// import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'

//utils
import { addTodo, markTodoDone, updateTodoTitle, fetcher, deleteTodo } from '../utils'

//components
import CreateTodo from '../components/Todos/CreateTodo'
import AllTodos from '../components/Todos/AllTodos'

//styles
import styles from '../styles/Home.module.css'

//hero icons
import { PlusCircleIcon } from '@heroicons/react/solid'

// Global context
import { useErrors } from './context/appContext'

export interface TodoStateType {
	todoTitle: string
	todoDescription: string
	todoDate: string
	isDone: boolean
}

export interface TodoType {
	_id: any
	id: string
	todoTitle: string
	todoDescription: string
	todoDate: string
	isDone: boolean
}
interface HomeComponentProps {
	allTodos: TodoType[]
}

export interface MutatedResponseType {
	data: TodoType[]
}

const Home = (props: HomeComponentProps) => {
	const [showCreateTodoForm, setShowCreateTodoForm] = useState(false)
	const [idOnEdit, setIdOnEdit] = useState<string | null>(null)
	const [isOnEdit, setIsOnEdit] = useState(false)
	const { allTodos } = props
	const { data, error } = useSWR('api/todos/all-todos', fetcher, { fallbackData: allTodos })
	const { mutate } = useSWRConfig()
	const [todosData, setTodosData] = useState<TodoType[]>(allTodos)

	const { formErrors, setFormErrors, setLoading } = useErrors()
	const [todoState, setTodoState] = useState<TodoStateType>({
		todoTitle: '',
		todoDescription: '',
		todoDate: '',
		isDone: false,
	})

	const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = event.currentTarget
		setTodoState({
			...todoState,
			[name]: value,
		})
	}

	const handleTodoDone = async (id: string, checked: boolean) => {
		console.log('id: ', id, 'is done is now', checked)
		const response = await markTodoDone(checked, id)
		const result = await response.json()

		const mutatedResult: MutatedResponseType = await mutate('api/todos/all-todos')
		setTodosData(
			mutatedResult.data && mutatedResult.data.map(singleTodo => ({ ...singleTodo, id: singleTodo._id.toString() })),
		)
		console.log('result after todo done UPDATE req', result)
	}

	const handleUpdateTodoTitle = async (idToEdit: string, updatedTodoTitle?: string) => {
		console.log('id to update', idToEdit, 'updated todo title', updatedTodoTitle)
		setIdOnEdit(idToEdit)
		setIsOnEdit(!isOnEdit)

		const response = await updateTodoTitle(idToEdit, updatedTodoTitle as string)
		const result = await response.json()

		const mutatedResult: MutatedResponseType = await mutate('api/todos/all-todos')
		setTodosData(
			mutatedResult.data && mutatedResult.data.map(singleTodo => ({ ...singleTodo, id: singleTodo._id.toString() })),
		)
		console.log('result after todo done UPDATE req', result)
	}

	const handleDeleteTodo = async (id: string) => {
		const response = await deleteTodo(id)
		const result = await response.json()
		const mutatedResult: MutatedResponseType = await mutate('api/todos/all-todos')

		setTodosData(
			mutatedResult.data && mutatedResult.data.map(singleTodo => ({ ...singleTodo, id: singleTodo._id.toString() })),
		)
		console.log('result after todo DELETE req', result)
	}

	const handleShowTodoForm = () => {
		setShowCreateTodoForm(!showCreateTodoForm)
		//set loading to false  once data is submiitted
		setLoading(false)
	}

	const handleCancel = (event?: React.FormEvent<HTMLFormElement>) => {
		event?.preventDefault()
		setShowCreateTodoForm(!showCreateTodoForm)
		setTodoState({ todoTitle: '', todoDescription: '', todoDate: '', isDone: false })
		setFormErrors({
			...formErrors,
			title: false,
			description: false,
			date: false,
		})
	}

	const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
		event?.preventDefault()
		//form input fields validation
		if (!todoState.todoTitle) {
			return setFormErrors({
				...formErrors,
				title: true,
				description: false,
				date: false,
			})
		} else {
			setFormErrors({
				...formErrors,
				title: false,
				description: false,
				date: false,
			})
		}
		if (!todoState.todoDescription) {
			return setFormErrors({
				...formErrors,
				title: false,
				description: true,
				date: false,
			})
		} else {
			setFormErrors({
				...formErrors,
				title: false,
				description: false,
				date: false,
			})
		}

		if (!todoState.todoDate) {
			return setFormErrors({
				...formErrors,
				title: false,
				description: false,
				date: true,
			})
		} else {
			setFormErrors({
				...formErrors,
				title: false,
				description: false,
				date: false,
			})
			// set  Loading to true when submitted data
			setLoading(true)
		}
		//end of form input field validation
		const response = await addTodo(todoState)
		const result = await response.json()
		const mutatedResult: MutatedResponseType = await mutate('api/todos/all-todos')

		setTodosData(
			mutatedResult.data && mutatedResult.data.map(singleTodo => ({ ...singleTodo, id: singleTodo._id.toString() })),
		)
		console.log('result after CreateTodo req', result)
		setTodoState({ todoTitle: '', todoDescription: '', todoDate: '', isDone: false })
		setShowCreateTodoForm(!showCreateTodoForm)
	}

	return (
		<main className={styles.main}>
			{showCreateTodoForm ? (
				<CreateTodo handleChange={handleChange} handleCancel={handleCancel} handleSubmit={handleSubmit} />
			) : (
				// update to make UI design
				<section onClick={handleShowTodoForm}>
					<PlusCircleIcon width={30} />
					<h1>Create a new todo...</h1>
				</section>
			)}

			<h2>Todos List 😊</h2>
			{todosData?.length === 0 && <div>No todos here</div>}
			{todosData
				?.map(todo => todo)
				.reverse() /*this reverses the order of the todos displayed ie. from the latest added to the oldest*/
				.map(todo => (
					<AllTodos
						todo={todo}
						idOnEdit={idOnEdit}
						isOnEdit={isOnEdit}
						handleTodoDone={handleTodoDone}
						handleUpdateTodoTitle={handleUpdateTodoTitle}
						handleDeleteTodo={handleDeleteTodo}
						key={todo.id}
					/>
				))}
		</main>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const client = await MongoClient.connect(
		`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@atlascluster.eaeksnx.mongodb.net/?retryWrites=true&w=majority`,
	)
	const db = client.db()
	const todosCollection = db.collection('userTodos')
	const todos = await todosCollection.find({}).toArray()
	client.close()

	return {
		props: {
			allTodos: todos.map(todo => ({
				id: todo._id.toString(),
				todoTitle: todo.todoTitle,
				todoDescription: todo.todoDescription,
				todoDate: todo.todoDate,
				isDone: todo.isDone,
			})),
		},
		revalidate: 1,
	}
}

export default Home
