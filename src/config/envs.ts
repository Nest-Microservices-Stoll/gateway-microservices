import 'dotenv/config';
import * as joi from 'joi';
import { NATS_SERVICE } from './services';

interface EnvVars {
    PORT: number;
    PRODUCT_MICROSERVICE_HOST: string
    PRODUCT_MICROSERVICE_PORT: number
    ORDER_MICROSERVICE_HOST: string
    ORDER_MICROSERVICE_PORT: number
    NATS_SERVERS: string[]
}

const envSchema = joi.object({
    PORT: joi.number().default(3000),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
}).unknown();



const { error, value } = envSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
});

if (error) {
    throw new Error(`Config validation error ${error.message}`);
}


const envVars: EnvVars = value


export const envs = {
    port: envVars.PORT,
    productMicroserviceHost: envVars.PRODUCT_MICROSERVICE_HOST,
    productMicroservicePort: envVars.PRODUCT_MICROSERVICE_PORT,
    orderMicroserviceHost: envVars.ORDER_MICROSERVICE_HOST,
    orderMicroservicePort: envVars.ORDER_MICROSERVICE_PORT,
    natsServers: envVars.NATS_SERVERS
}

export default envs;