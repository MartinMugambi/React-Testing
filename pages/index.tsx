//react
import React, { useState } from 'react'

//nextjs
import { GetServerSideProps, GetStaticProps } from 'next'

//mongodb
import { MongoClient } from 'mongodb'

//swr
import useSWR, { useSWRConfig } from 'swr'

//utils
import { addTodo, fetcher } from '../utils'

//components
import CreateTodo from '../components/Todos/CreateTodo'
import AllTodos from '../components/Todos/AllTodos'
import Button from '../components/button'
import Header from '../components/header'

//styles
import styles from '../styles/Home.module.css'

export interface TodoStateType {
	todoTitle: string
	todoDescription: string
	todoDate: string
	isDone: boolean
}

export interface TodoType {
	_id: any
	id: string | null
	todoTitle: string
	todoDescription: string
	todoDate: string
	isDone: boolean
}
interface HomeComponentProps {
	allTodos: TodoType[]
}

interface MutatedResponseType {
	data: TodoType[]
}

const Home = (props: HomeComponentProps) => {
	const [showCreateTodoForm, setShowCreateTodoForm] = useState(false)
	const { allTodos } = props
	const { data, error } = useSWR('api/todos/all-todos', fetcher, { fallbackData: allTodos })
	const { mutate } = useSWRConfig()
	const [todosData, setTodosData] = useState<TodoType[]>(allTodos)

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

	const handleShowTodoForm = () => setShowCreateTodoForm(!showCreateTodoForm)

	const handleCancel = (event?: React.FormEvent<HTMLFormElement>) => {
		event?.preventDefault()
		setShowCreateTodoForm(!showCreateTodoForm)
	}

	const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
		event?.preventDefault()

		const response = await addTodo(todoState)
		const result = await response.json()
		const mutatedResult: MutatedResponseType = await mutate('api/todos/all-todos')

		setTodosData(
			mutatedResult.data && mutatedResult.data.map(singleTodo => ({ ...singleTodo, id: singleTodo._id.toString() })),
		)
		console.log('result', result)
		setTodoState({ todoTitle: '', todoDescription: '', todoDate: '', isDone: false })
		setShowCreateTodoForm(!showCreateTodoForm)
	}

	return (
		<main className={styles.main}>
			<Header />
			{showCreateTodoForm ? (
				<CreateTodo handleChange={handleChange} handleCancel={handleCancel} handleSubmit={handleSubmit} />
			) : (
				<Button type='button' title='Create a todo' bgColor='grey' color='black' onClick={handleShowTodoForm} />
			)}

			<h2>The rest of the todos 😊 {/*example illustration*/}</h2>
			{todosData?.length === 0 && <div>No todos here</div>}
			{todosData
				?.map(todo => todo)
				.reverse() /*reverse the order of the todos, to be displayed from the latest added to the oldest*/
				.map(todo => (
					<AllTodos todo={todo} key={todo.id} />
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
			})),
		},
		revalidate: 1,
	}
}

export default Home
