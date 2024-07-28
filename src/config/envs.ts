import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
}
const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);
const envVars: EnvVars = value;
// console.log({ error });
// console.log({ envVars });

//JOI VALIDATION
if (error) {
  throw new Error(`Config Error Validation ${error.message}`);
}
export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
};
