import express, { Request, Response } from 'express'
import { validationResult } from 'express-validator/check';

import { User, mapUsers, Exercise } from "../models"
import { toTs } from "../utils/format";
import { validate } from "../utils/validate"

export const router = express.Router()

// ✅ You can POST to /api/users with form data username to create a new user. 
// ✅ The returned response will be an object with username and _id properties.

router.post('/users', async (req, res) => {
  const { username = null } = req.body;

  try {
    const isExist = await User.findOne({
      username
    })

    if (isExist) {
      throw {
        code: 409,
        errorMessage: 'Username already exist'
      }
    }

    const user = await User.create({ username })

    res.send(user);
  } catch (err: any) {
    const status = err.code || 500
    const message = err.message || err.toString()
    res.status(status).send(message)
  }
});

// ✅ You can make a GET request to /api/users to get an array of all users. 
// ✅ Each element in the array is an object containing a user's username and _id.

router.get('/users', async (req, res) => {
  try {
    const users: any = await User.find({})
    res.send(mapUsers(users));
  } catch (err) {
    res.send(err);
  }
});

// ✅ You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. 
// ✅ If no date is supplied, the current date will be used. 
// ✅ The response returned will be the user object with the exercise fields added.

router.post("/users/:_id/exercises", async (req, res) => {

  const {
    description = '',
    duration = '',
    date = +new Date()
  } = req.body;

  const id = req.params._id;

  try {
    const { _id: userId } = await User.findById(id).catch((err) => {
      throw {
        code: '404',
        message: "User not found"
      }
    });

    const exercise = await Exercise.create({
      userId,
      description,
      duration,
      date
    });

    res.send(exercise);
  } catch (err: any) {
    const status = err.code || 500
    const message = err.message || err.toString()
    res.status(status).send(message)
  }
});

// ✅ You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user. 
// ✅ The returned response will be the user object with a log array of all the exercises added. 
// ✅ Each log item has the description, duration, and date properties.
// ✅ A request to a user’s log (/api/users/:_id/logs) returns an object with a count property representing the total number of exercises without limits.
// ✅ You can add from, to and limit parameters to a /api/users/:_id/logs request to retrieve part of the log of any user. 
// ✅ from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.

router.get(
  "/users/:_id/logs", validate.params.logs, async (req: Request, res: Response) => {
    const { _id: userId } = req.params
    const { from, to, limit = 0 } = req.query

    try {

      if (limit) {
        const validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()) {
          const message = validationErrors.array()
          return res.status(400).send({
            code: 400,
            message
          });
        }
      }

      const { username } = await User.findById(userId)
      const exercises = await Exercise.find({ userId })

      const total = exercises.length // ✅ total count of logs

      const logs = exercises
        .filter(({ date }) => {
          if (from) return toTs(from) <= toTs(date)
          if (to) return toTs(to) >= toTs(date)
          return true
        });

      if (limit) {
        logs.splice(Number(limit))
      }

      res.send({
        username,
        total,
        logs
      });
    } catch (err: any) {
      const status = err.code || 500
      const message = err.message || err.toString()
      res.status(status).send(message)
    }
  },
);