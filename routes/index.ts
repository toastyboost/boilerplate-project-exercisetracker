const express = require('express')

import { User, Exercise } from "../models"

const router = express.Router()

router.post('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})
 
router.get('/api/users', function(req, res) {
  const { username } = req.body;
  const user = await User.create({ username });
  res.send(user);
});

router.post("/api/users/:_id/exercises", async (req, res) => {
  let { _id } = req.params;
  let { description, duration, date } = req.body;

  const exercise = await Exercise.create({
    userId: _id,
    description,
    duration,
    date,
  });

  const { username } = await User.findById(userId);

  const result = {
    _id: userId, 
    username, 
    description, 
    duration, 
    date: formatDate(date) 
  }

  res.send(result);
});

app.get(
  "/api/users/:_id/logs", async (req, res) => {
 
    const parsedUrl = url.parse(req.url);
    // ❗️if limit is undefined, limit() will simply return all found documents
    let { from, to, limit } = querystring.parse(parsedUrl.query);
    // if abscent, replace them with boundary dates.
    from = from || "0001";
    to = to || "3000";
    // query username
    let { _id: userId } = req.params;
    const { username } = await User.findById(userId);
    // query exercises
    const foundExercises = await Exercise.find({
      $and: [
        { userId },
        // ❗️If use mongodb driver instead then should replace new Date() with ISODate()
        { date: { $gte: new Date(from), $lte: new Date(to) } },
      ],
    }).limit(limit);
    const log = foundExercises.map(({ description, duration, date }) => ({
      description,
      duration,
      date: formatDate(date),
    }));

    let count = log.length;
    // send back data
    res.send({ _id: userId, count, username, log });
  },
);