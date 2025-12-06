const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.engine('handlebars', engine()); 
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// RUTAS
app.get('/', (req, res) => {
    const rutaArchivo = path.join(__dirname, 'data', 'contactos.txt');

    fs.readFile(rutaArchivo, 'utf8', (err, data) => {
        if (err) {
            console.error("Error al leer el archivo:", err);
            return res.render('home', { contactos: [] });
        }

        let contactos = [];
        try {
            contactos = JSON.parse(data);
        } catch (parseError) {
            console.error("Error al analizar el JSON:", parseError);
        }

        res.render('home', { contactos: contactos });
    });
});

app.get('/agregar', (req, res) => {
    res.render('agregar');
});

app.post('/agregar', (req, res) => {
    const { nombre, telefono, email } = req.body;
    const rutaArchivo = path.join(__dirname, 'data', 'contactos.txt');

    fs.readFile(rutaArchivo, 'utf8', (err, data) => {
        let contactos = [];
        
        if (!err && data) {
            try {
                contactos = JSON.parse(data);
            } catch (e) {
                console.error("Error parseando JSON existente, se iniciará vacío.");
            }
        }

        const nuevoContacto = {
            id: Date.now(), 
            nombre: nombre,
            telefono: telefono,
            email: email
        };

        contactos.push(nuevoContacto);

        fs.writeFile(rutaArchivo, JSON.stringify(contactos, null, 2), (err) => {
            if (err) {
                console.error("Error al guardar:", err);
                return res.status(500).send("Error al guardar el contacto");
            }

            res.redirect('/');
        });
    });
});


app.get('/borrar/:id', (req, res) => {
    const idParaBorrar = parseInt(req.params.id);
    const rutaArchivo = path.join(__dirname, 'data', 'contactos.txt');

    fs.readFile(rutaArchivo, 'utf8', (err, data) => {
        if (err) {
            console.error("Error al leer archivo:", err);
            return res.redirect('/');
        }

        try {
            const contactos = JSON.parse(data);

            const contactosActualizados = contactos.filter(contacto => contacto.id !== idParaBorrar);

            fs.writeFile(rutaArchivo, JSON.stringify(contactosActualizados, null, 2), (err) => {
                if (err) {
                    console.error("Error al guardar después de borrar:", err);
                }

                res.redirect('/');
            });

        } catch (error) {
            console.error("Error procesando los datos:", error);
            res.redirect('/');
        }
    });
});





app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});