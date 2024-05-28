//  encriptado

const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');  

app.use(express.urlencoded({extended: true}));
//para manejar formularios HTML POST que envían datos en el formato application/x-www-form-urlencoded.
//Función de express.urlencoded()
//analiza el cuerpo de la solicitud entrante y lo convierte en un objeto JavaScript accesible a través de req.body. Este middleware es necesario cuando quieres manejar datos de formularios enviados mediante el método POST.
//Los formularios HTML típicamente envían datos en el formato application/x-www-form-urlencoded cuando el método es POST.
//puede aceptar un objeto de opciones para personalizar su comportamiento. La opción más comúnmente usada es extended.
//extended: true usa la biblioteca qs para analizar el cuerpo de la solicitud, lo que permite el análisis de objetos anidados.
//extended: false usa la biblioteca querystring, que no permite objetos anidados.

// ejemplo:
/*
const express = require('express');
const app = express();
const port = 3000;

// Middleware para analizar cuerpos de solicitudes URL-encoded
app.use(express.urlencoded({ extended: true }));

app.post('/submit-form', (req, res) => {
    // Accediendo a los datos del formulario a través de req.body
    const name = req.body.name;
    const email = req.body.email;
    res.send(`Name: ${name}, Email: ${email}`);
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
*/

app.use(express.json());
//se utiliza para analizar cuerpos de solicitudes entrantes con datos JSON. Este middleware es esencial cuando quieres manejar solicitudes POST, PUT, PATCH o cualquier otra solicitud que incluya un cuerpo JSON.
//analiza el cuerpo de la solicitud entrante y lo convierte en un objeto JavaScript accesible a través de req.body. Esto es especialmente útil cuando trabajas con APIs que envían y reciben datos en formato JSON.

app.post ('/login', async (req, res)=>{
    const user=req.body.usuario;
    const password=req.body.password;
    console.log(`user ${user} pass ${password}`)
    if(user== 'admin' && password == '12345'){
        let passHash = await bcryptjs.hash(password, 8);
 //     para hacerlo sincrono se pone:
 //      let passHash = bcryptjs.hashSync(password, 8);    
 //     y se saca el   async  de app.post    
        res.json({
            message: 'INGRESO OK',
            passHash: passHash
        })
    } else{
        res.json({
            message: 'Ingrese correctamente',
        })
    }
})

//   ruta para comparar la clave hasheada
app.get('/compare', (req, res)=>{
    let clave = req.body.password;
    let hashSaved = '$2a$08$s/xrJIgrEy5c57/jutLzU.dLz2sXeUHlcsVypwvopDWE1qL1Ec4Y.'
    let compara = bcryptjs.compareSync(clave, hashSaved);
    if(compara){
        res.json('Pass correcta')
    }else{
        res.send('claves incorrectas')
    }
})



const puerto = process.env.PORT || 3000;
app.listen(puerto, () =>{
    console.log(`Server en ${puerto}`)
})