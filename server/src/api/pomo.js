const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');

const db = monk(process.env.MONGO_URI);
const pomoDB = db.get('pomo');

const schema = Joi.object({
  pomo_time: Joi.string().trim().required(),
  short_break: Joi.string().trim().required(),
  long_break: Joi.string().trim().required(),
  auto_start: Joi.string().trim().required(),
  volume: Joi.string().trim().required(),
  long_interval: Joi.string().trim().required(),
  dark_mode: Joi.string().trim().required(),
  noti_freq: Joi.string().trim().required(),
  noti_time: Joi.string().trim().required(),
});

const router = express.Router();
pomoDB.insert({
  auto_start: 'false',
  dark_mode: 'false',
  long_break: '15',
  long_interval: '4',
  noti_freq: 'Last',
  noti_time: '5',
  pomo_time: '25',
  short_break: '5',
  volume: '50',
  tasks: [
    { id: 1, content: 'HTML', completed: true, allEst: 1, est: 0, active: false }
  ],
});

// READ ALL
router.get('/', async (req, res, next) => {
  try {
    const items = await pomoDB.find({});
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// READ One
router.get('/get/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await pomoDB.findOne({
      _id: id,
    });
    if (!item) return next();
    return res.json(item);
  } catch (error) {
    next(error);
  }
});

// Create One
router.post('/post', async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    const inserted = await pomoDB.insert(value);
    res.json(inserted);
  } catch (error) {
    next(error);
  }
});

// Update One
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    // const value = await schema.validateAsync(req.body);
    const value = req.body;
    const item = await pomoDB.findOne({
      _id: id,
    });
    if (!item) return next();
    await pomoDB.update({
      _id: id,
    }, {
      $set: value,
    });
    res.json(value);
  } catch (error) {
    next(error);
  }
});

// Delete One
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await pomoDB.remove({
      _id: id
    });
    res.json({
      message: 'Success',
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
