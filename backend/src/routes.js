const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const ArmController = require('./controllers/ArmController');

const routes = Router();

routes.post('/mover-braco', celebrate({
  [Segments.BODY]: Joi.object().keys({
    shoulder: Joi.number().required(),
    elbow: Joi.number().required(),
    pulse: Joi.number().required(),
  }),
}), ArmController.move);

module.exports = routes;