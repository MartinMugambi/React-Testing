//next API types
import type { NextApiRequest, NextApiResponse } from 'next'

import { MongoClient } from 'mongodb'

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const client = await MongoClient.connect(
				`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@atlascluster.eaeksnx.mongodb.net/?retryWrites=true&w=majority`,
			)
			const db = client.db()
			const todosCollection = db.collection('userTodos')

			try {
				const result = await todosCollection.find({}).toArray()
				console.log('result after fetching all todos', result)
				client.close()
				return res.status(201).json({ data: result })
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
