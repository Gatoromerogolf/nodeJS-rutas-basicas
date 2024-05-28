const express = require('express');
var app = express();
var jwt = require('jsonwebtoken');

const keys = require('./settings/keys');

app.set('key', keys.key)
app.use(express.urlencoded({extended:false}))
app.use(express.json());

/*
app.get('/', (req, res) => {
  res.send("se recibio el get")
})
*/

app.get('/saludo', function (req, res) {
  res.send('entro por el saludo.....')
})

//  puerto que se toma del environment que te da el hosting, sino el 3000
const PUERTO = process.env.PORT || 3000
app.listen(PUERTO, () => {
  console.log(`El servidor está escuchando en el puerto ${PUERTO}....`)
})

app.post('/login', (req, res) => {
  if (req.body.usuario == 'admin' && req.body.pass == '12345') {
    const payload = {
      check: true
    };
    const token = jwt.sign(payload, app.get('key'), {
      expiresIn: '7d'
    });
    res.json({
      message: '¡Autenticación exitosa!',
      token: token
    });
  } else {
    res.send('autenticacion incorrecta')
  }
})

const verificacion = express.Router();
verificacion.use((req, res, next) =>{
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  // console.log(token);
  if(!token){
    res.status(401).send({
      error: 'Es necesario el token  para la autenticación'
    })
    return
  }
})

app.get('/', verificacion, (req, res) =>{
  res.json("INFORMACION ENTREGADA")
})