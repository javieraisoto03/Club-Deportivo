import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Leer datos del archivo JSON
const readData = () => {
    const data = fs.readFileSync(path.join(__dirname, 'sports.json'), 'utf-8');
    return JSON.parse(data);
}

// Escribir datos en el archivo JSON
const writeData = (data) => {
    fs.writeFileSync(path.join(__dirname, 'sports.json'), JSON.stringify(data, null, 2));
}

// Ruta para agregar un nuevo deporte
app.get('/agregar', (req, res) => {
    const { nombre, precio } = req.query;
    let deportes = readData();
    deportes.push({ nombre, precio });
    writeData(deportes);
    res.send('Deporte agregado exitosamente');
});

// Ruta para obtener todos los deportes
app.get('/deportes', (req, res) => {
    let deportes = readData();
    res.json({ deportes });
});

// Ruta para editar un deporte
app.get('/editar', (req, res) => {
    const { nombre, precio } = req.query;
    let deportes = readData();
    deportes = deportes.map(d => d.nombre === nombre ? { nombre, precio } : d);
    writeData(deportes);
    res.send('Deporte editado exitosamente');
});

// Ruta para eliminar un deporte
app.get('/eliminar', (req, res) => {
    const { nombre } = req.query;
    let deportes = readData();
    deportes = deportes.filter(d => d.nombre !== nombre);
    writeData(deportes);
    res.send('Deporte eliminado exitosamente');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
