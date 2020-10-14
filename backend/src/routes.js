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

routes.get('/agarrar', ArmController.grab);

routes.post('/salvar-posicao-1', celebrate({
  [Segments.BODY]: Joi.object().keys({
    shoulder: Joi.number().required(),
    elbow: Joi.number().required(),
    pulse: Joi.number().required(),
  }),
}), ArmController.savePosition1);

routes.post('/salvar-posicao-2', celebrate({
  [Segments.BODY]: Joi.object().keys({
    shoulder: Joi.number().required(),
    elbow: Joi.number().required(),
    pulse: Joi.number().required(),
  }),
}), ArmController.savePosition2);

routes.get('/rodar', ArmController.play);

routes.get('/parar', ArmController.stop);

module.exports = routes;