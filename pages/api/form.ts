import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../lib/mongo'


type Data = {
    data: string
}

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<Data>) {
    // Get data submitted in request's body.
    const body = req.body

    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body)

    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.title || !body.description) {
        // Sends a HTTP bad request error code
        return res.status(400).json({ data: 'First or last name not found' })
    }
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const { title, description } = req.body;

        const post: any = await db.collection("tasks").insertOne({
            title,
            description,
            status: "OPEN"
        });

        res.json(post);
    } catch (e: any) {
        console.error(e);
        throw new Error(e).message;
    }

    // Found the name.
    // Sends a HTTP success code
    res.status(200).json({ data: `${body.title} ${body.description}` })
}

