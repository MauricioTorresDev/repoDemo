const express = require('express');
const app = express();
const morgan = require('morgan')
const path = require('path')
const PORT = 3000;
const ip = 'localhost'
const connection = require("./db/db")

app.use(morgan('dev'))
app.use(express.static('public/'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
})

app.get('/atencion', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html/atencion.html'))
})

app.get('/formulario', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html/formulario.html'))
})

app.get('/galeria', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html/galeria.html'))
})

app.get('/historia', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html/historia.html'))
})

app.get('/mision-vision', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html/mision-vision.html'))
})

app.get('/nosotros', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html/nosotros.html'))
})

// Ruta API para obtener fechas cívicas
app.get('/api/dates/:current', (req, res) => {
    // Obtener el parámetro de la solicitud
    var request = req.params.current;

    // Realizar consulta a la base de datos
    connection.query('SELECT ID, DATE_FORMAT(FECHA, "%d/%m/%Y") AS FECHA, NOMBRE, DESCRIPCION, TIPO_FECHA, ACTIVO FROM FECHAS_CIVICAS WHERE FECHA = ?', [request], (err, row, fields) => {
        if (row && row.length > 0) {
            // Si hay resultados, enviarlos como JSON
            console.log('Respuesta del Json: ', row[0]);
            res.json(row[0]);
        } else {
            // En caso de error o no encontrar datos, enviar null
            if (err) {
                console.log('Error al obtener los datos: ', err);
            } else {
                console.log('No se encontraron datos para la fecha:', request);
            }
            res.json(null);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server en http://${ip}:${PORT}`)
})