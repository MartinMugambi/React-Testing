import type { NextApiRequest, NextApiResponse } from 'next'

//mongodb
import { MongoClient, ObjectId } from 'mongodb'

type ResponseType = {
	message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const todoId = req.query.todoId as string

	if (req.method === 'PUT') {
		const isDone = req.body
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
							isDone: JSON.parse(isDone),
						},
					},
				)
				console.log('result after successful update', result)
				client.close()
				return res.status(201).json({ message: 'Successfully updated the todos isDone response' })
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
