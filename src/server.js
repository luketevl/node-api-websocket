import WebSocket from 'ws';
import uuid from 'uuid';
import express from 'express';
import expressWs from 'express-ws';
// process.env.ENV == 'prod'
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { NEWTOKEN , WSLOGIN} from './api/config/env';

const port = process.env.PORT || 3004;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.json({ type: 'application/json'}));  
app.use(morgan((process.env.ENV == 'prod' ? 'tiny' : 'dev')));

expressWs(app);

const sockets = [];
app.use(function (req, res, next) {
  return next();
});

app.post('/:uuid', function(req, res, next){
  try{
    console.log('sockets', req.body, sockets[req.params.uuid]);
    if(sockets[req.params.uuid]){
      sockets[req.params.uuid].send(JSON.stringify({ type : WSLOGIN , value: req.body }));
      res.statusCode(202).send({ msg: 'OK'})
    }else{
      throw "";
    }
    
  }catch(ex){
    return res.status(403).send({ msg: ex})
  }
  res.statusCode(403).send({ msg: 'Forbidden, credential not found'})
});

app.ws('/', function(ws, req) {
  console.log('socket');
  ws.on('message', function(msg) {
    console.log('msg');
    try{
      if(sockets[req.params.uuid]){
        sockets[req.params.uuid].send(msg);
      }
    }catch(ex){
      console.log(ex);
    }
  });

  // console.log('socket', req.headers);

  const id = uuid.v4();
  sockets[id] = ws;
  ws.send(JSON.stringify({ type : NEWTOKEN , value: id }));
});

const server = app.listen(port, () => console.log(`server started on port ${port}`));
export {app, server};
 