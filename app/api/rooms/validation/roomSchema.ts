import Joi from 'joi';


export const addRoomSchema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  description: Joi.string().required().min(10).max(250)
});
