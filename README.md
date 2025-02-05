<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Running the app


1. Run `npm install` to install dependencies.
2. Create env file with `.env.template` and fill it with your configuration.
3. Run nats server
4. Run the microservices
5. Run `npm run start` to start the app.


## NATS

````
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```