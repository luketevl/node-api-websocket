> Project using express and websocket to send information

### ENDPOINT

| Type | Endpoint |           Return           |                       Description                      |
|:----:|:--------:|:--------------------------:|:------------------------------------------------------:|
| POST | /:uuid   | { msg: String }            | Recive data of http and send to websocket              |
| WS   | /        | { token, ...request.body } | Send token to client and message to specific websocket |

### How do I get set up? ###
- Configuration
```shell
npm i
```
- This project use es6 imports
- Dependencies
  - Websocket
  - Express
- Deployment instructions
```shell
npm run dev
```
- Deploy
```shell
npm start
```
### Who do I talk to? ###

* luketevl@gmail.com