// sessions y cookies

const express = require('express');
const app = express();
const session = require('express-session')

const MySQLStore = require('express-mysql-session');

const options = {
    host : 'localhost',
    port: 3306,
    user: 'root',
    password: 'Flam822mysql',
    database: 'prueba-session'
}

const sessionStore = new MySQLStore (options);
app.use(session({
    key: 'cookie_usuario',
    secret: '123456',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}))


app.use(session({
    secret: '123456',
    resave: true,
    saveUninitialized: true
}))

// contador de visitas
app.get('/', (req, res)=>{
    req.session.usuario = 'Juan Perez';
    req.session.rol = 'Admin';
    req.session.numeroVisitas = req.session.numeroVisitas ? ++req.session.numeroVisitas : 1;
    console.log (req.session)
    //  si existe (?) le suma una, sino, lo crea con valor 1
    res.send(`el usuario ${req.session.usuario} visitó esta pagina ${req.session.numeroVisitas}`)
})

const puerto = process.env.port || 3000;
app.listen(puerto, () =>{
    console.log(`Servicio escuchando en ${puerto}`)
})