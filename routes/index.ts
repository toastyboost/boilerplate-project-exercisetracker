const express = require('express')

import { User, Exercise } from "../models"

const router = express.Router()

router.post('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})
 
router.get('/api/users', async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.create({ username });
    res.send(user);
  } catch (err) {
    res.send(err);
  }
 
});

router.post("/api/users/:_id/exercises", async (req, res) => {

  const { description, duration, date } = req.body;
  const { _id } = req.params;

  try {
    const exercise = await Exercise.create({
      userId: _id,
      description,
      duration,
      date,
    });
  
    const { username } = await User.findById(userId);

    if (!username) {
      throw new Error('User does not exist')
    } 
    
    const responce = {
      _id: userId, 
      username, 
      description, 
      duration, 
      date: date || +new Date()
    }
  
    res.send(responce);
  } catch (err) {
    res.send(err);
  }
});

app.get(
  "/api/users/:_id/logs", async (req, res) => {
    const { _id, url } = req.params;
    const { from = null, to = null, limit = 0 } = req.query;

    try {
      const { username } = await User.findById(_id);
      const exercises = await Exercise.find({ userId: _id })
        
      const logs = exercises
        .filter(({ date }) => {
          if (from) return date >= from
          if (to) return date <= to
          return false
        });

      if (limit) {
        logs.slice(0, limit);
      }

      res.send({ username, logs });

    } catch (err) {
      res.send(err);
    }
     
  },
);