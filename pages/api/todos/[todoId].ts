import type { NextApiRequest, NextApiResponse } from 'next'

//mongodb
import { MongoClient, ObjectId, Collection } from 'mongodb'

type ResponseType = {
	message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const todoId = req.query.todoId as string

	if (req.method === 'DELETE') {
		try {
			const client = await MongoClient.connect(
				`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@atlascluster.eaeksnx.mongodb.net/?retryWrites=true&w=majority`,
			)
			const db = client.db()
			const todosCollection = db.collection('userTodos')

			try {
				const result = await todosCollection.deleteOne({ _id: new ObjectId(todoId) })
				console.log('result after successful deletion', result)
				client.close()
				return res.status(201).json({ message: 'Successfully deleted the todo' })
			} catch (error) {
				console.log('error', error)
				return res.status(500).json({ message: 'error deleting the todo from the todos collection' })
			}
		} catch (error) {
			console.log('error', error)
			res.status(500).json({
				message: 'error trying to connect to the mongodb connection',
			})
		}
	} else if (req.method === 'PUT') {
		const todoTitleTextUpdate = req.body
		try {
			const client = await MongoClient.connect(
				`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@atlascluster.eaeksnx.mongodb.net/?retryWrites=true&w=majority`,
			)
			const db = client.db()
			const todosCollection = db.collection('userTodos')

			try {
				const result = await todosCollection.updateOne(
					{ _id: new ObjectId(todoId) },
					{
						$set: {
							todoTitle: todoTitleTextUpdate,
						},
					},
				)
				console.log('result after successful update', result)
				client.close()
				return res.status(201).json({ message: 'Successfully edited the todo' })
			} catch (error) {
				console.log('error', error)
				res.status(500).json({
					message: 'error deleting the todo from the todos collection',
				})
			}
		} catch (error) {
			console.log('error', error)
			res.status(500).json({
				message: 'error trying to connect to the mongodb connection',
			})
		}
	}
}
