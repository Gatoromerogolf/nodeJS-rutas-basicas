const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public')); // si no se pone no se ve la imagen
app.use('/recursos', express.static(__dirname + '/public'));
console.log(__dirname);

app.get('/', (req, res) => {
  res.render('index.ejs');
})

const puerto = process.env.port || 3000;
app.listen(puerto, () => {
  console.log('escuchando en ' + puerto)
  console.log(`el dirnmame ${__dirname}`)
})