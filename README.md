# Push Notification API
This API is used for assigning device to customer and sending notifications.

# Technical bits used
- Node JS
- [NestJS](https://github.com/nestjs/nest) framework. It provides a great way to build Node JS app
- TypeScript
- Firebase
- Tesing by using: 
    - SuperTest
    - Jest
    - Nock


# How to use

```
$ git clone https://github.com/mukeshrawat02/push-notification-api.git <project>
$ cd <project>
$ npm install
```

### Use one of the following to build and test:

```bash
npm run dev        # Run it directly with 'ts' file 
npm run build      # Build the project using the 'tsc' compiler.
npm start          # Run it from converted 'js' file from 'ts'
npm test           # Run unit test cases
npm run test:cov   # Generate test coverage report
npm run test:e2e   # Run end to end test flow
```
> The API will run on default `3000` port which can be change in `\src\main.ts`


# Swagger UI
Swagger is active by default so when server is up you can see the API definition on 
`http://localhost:3000/api`
