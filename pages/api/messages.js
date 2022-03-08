// api/users.js

import dbConnect from '../../lib/dbConnect'
import Message from './../../models/Message'

export default async function handler (req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const messages = await Message.find()
        res.status(200).send(messages)
      } catch (error) {
        res.status(400).send(error)
      }
      break
    case 'POST':
      try {
        const message = await Message.create(req.body)
        res.status(201).send(message)
      } catch (error) {
        res.status(400).send(error)
      }
      break
    default:
      res.status(400).send('invalid request method')
      break
  }
}