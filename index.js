const express = require('express');
const conectarBD = require('./config/db');
const cors = require('cors');

//crear el servidor
const app = express();

//conectar a la BD
conectarBD();

// Habilitar cors
app.use(cors());

//Habilitar Express.Json
app.use(express.json({ extended: true }));

//puerto de la app 
const PORT = process.env.PORT || 4000;

//Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

//Definir la página principal
/* app.get('/', (req, res) => {
    res.send("Hola")
}); */

//Levantar la app
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
})