// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

type Data = {
  message: string;
};
// /api/new-meetup
// POST /api/new-meetup
// next.js will trigger this function when frontend send POST req to this endpoint '/api/new-meetup'
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const data = req.body;
    console.log('handler', data);
    // connect and save data in database
    const uri =
      'mongodb+srv://admin-vasily:vm6rJTtrHFjlwntr@todocluster.kf4x7.mongodb.net/?retryWrites=true&w=majority';
    const client = await MongoClient.connect(uri);
    //use only URL encoded characters
    const db = client.db('meetupsDB');
    const meetupCollection = db.collection('meetups');
    const result = await meetupCollection.insertOne(data);
    console.log(result);
    client.close();
    // send response
    res.status(201).json({ message: 'Meetup inserted!' });
  }
}
