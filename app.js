const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

// 1. Importamos las rutas (Esto estaba bien)
const contactosRoutes = require('./routes/contactos');

const app = express();
const PORT = 3000;

app.engine('handlebars', engine()); 
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', contactosRoutes); 

app.use((req, res, next) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});