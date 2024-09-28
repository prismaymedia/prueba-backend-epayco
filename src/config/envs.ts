import * as Joi from 'joi';
import 'dotenv/config';

interface EnvVars {
  PORT: number;
  MONGO_URI: string;
  URL_MOVIE_API: string;
  API_KEY_MOVIE_API: string;
}

const envsSchema = Joi.object({
  PORT: Joi.number().required(),
  MONGO_URI: Joi.string().required(),
  URL_MOVIE_API: Joi.string().required(),
  API_KEY_MOVIE_API: Joi.string().required(),
}).unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  mongoUri: envVars.MONGO_URI,
  urlMovieApi: envVars.URL_MOVIE_API,
  apiKeyMovieApi: envVars.API_KEY_MOVIE_API,
};
