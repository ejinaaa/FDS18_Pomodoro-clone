const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');

const db = monk(process.env.MONGO_URI);
const pomoDB = db.get('pomo');

const schema = Joi.object({
  time_set: Joi.string().trim().required(),
  auto_start: Joi.string().trim().required(),
  volume: Joi.string().trim().required(),
  long_interval: Joi.string().trim().required(),
  dark_mode: Joi.string().trim().required(),
  notification: Joi.string().trim().required(),
});

const router = express.Router();

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
router.get('/:id', async (req, res, next) => {
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
router.post('/', async (req, res, next) => {
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
    const value = await schema.validateAsync(req.body);
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
