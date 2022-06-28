//next API types
import type { NextApiRequest, NextApiResponse } from 'next'

//mongodb
import { MongoClient } from 'mongodb'

type ResponseType = {
	message: string
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	if (req.method === 'POST') {
		const data = req.body

		try {
			const client = await MongoClient.connect(
				`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@atlascluster.eaeksnx.mongodb.net/?retryWrites=true&w=majority`,
			)
			const db = client.db()
			const todosCollection = db.collection('userTodos')

			try {
				const result = await todosCollection.insertOne(data)
				console.log('result after successful addition of todo', result)
				client.close()
				return res.status(201).json({ message: 'Successfully added the todo' })
			} catch (error) {
				console.log('error', error)
				return res.status(500).json({ message: 'error inserting data into the todos collection' })
			}
		} catch (error) {
			console.log('error', error)
			return res.status(500).json({ message: 'error connecting to the todos collection' })
		}
	}
}

export default handler
