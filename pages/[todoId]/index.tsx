//mongodb
import { MongoClient, ObjectId, WithId, Document } from 'mongodb'

//nextjs
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

//components
import SingleTodo from '../../components/Todos/SingleTodo'

///types
import { TodoType } from '../index'

interface ContextType extends ParsedUrlQuery {
	todoId: string
}
interface TodoDocument {
	_id: ObjectId
	todoTitle: string
	todoDescription: string
	todoDate: string
	isDone: boolean
}

interface SingleTodoPagePropType {
	todoData: TodoType
}

const SingleTodoPage = (props: SingleTodoPagePropType) => {
	const { todoData } = props
	return (
		<>
			<SingleTodo todo={todoData} />
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const client = await MongoClient.connect(
		`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@atlascluster.eaeksnx.mongodb.net/?retryWrites=true&w=majority`,
	)
	const db = client.db()
	const todosCollection = db.collection('userTodos')

	const todos = await todosCollection.find({}, { projection: { _id: 1 } }).toArray()

	console.log('todos from getStaticPaths', todos)
	client.close()
	return {
		paths: todos.map(todo => ({
			params: { todoId: todo._id.toString() },
		})),
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps = async context => {
	//get the todoId from the params
	const { todoId } = context.params as ContextType
	console.log('todoId', todoId)

	const client = await MongoClient.connect(
		`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@atlascluster.eaeksnx.mongodb.net/?retryWrites=true&w=majority`,
	)
	const db = client.db()
	const todosCollection = db.collection('userTodos')

	const todoOnView = (await todosCollection.findOne({ _id: new ObjectId(todoId) })) as TodoDocument
	console.log('todo on view', todoOnView)
	client.close()
	return {
		props: {
			todoData: {
				id: todoOnView._id.toString(),
				todoTitle: todoOnView.todoTitle,
				todoDescription: todoOnView.todoDescription,
				todoDate: todoOnView.todoDate,
				isDone: todoOnView.isDone,
			},
		},
	}
}

export default SingleTodoPage
