const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const rutaArchivo = path.join(__dirname, '../data', 'contactos.txt');

const leerContactos = () => {
    try {
        const data = fs.readFileSync(rutaArchivo, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const guardarContactos = (contactos) => {
    fs.writeFileSync(rutaArchivo, JSON.stringify(contactos, null, 2));
};

// --- RUTAS ---
router.get('/', (req, res) => {
    const contactos = leerContactos();
    res.render('home', { contactos });
});


router.get('/agregar', (req, res) => {
    res.render('agregar');
});


router.post('/agregar', (req, res) => {
    const { nombre, telefono, email } = req.body;
    const contactos = leerContactos();
    
    const nuevoContacto = {
        id: Date.now(),
        nombre,
        telefono,
        email
    };

    contactos.push(nuevoContacto);
    guardarContactos(contactos);
    res.redirect('/');
});


router.get('/borrar/:id', (req, res) => {
    const idParaBorrar = parseInt(req.params.id);
    let contactos = leerContactos();
    contactos = contactos.filter(c => c.id !== idParaBorrar);
    guardarContactos(contactos);
    res.redirect('/');
});


router.get('/editar/:id', (req, res) => {
    const idEditar = parseInt(req.params.id);
    const contactos = leerContactos();
    const contacto = contactos.find(c => c.id === idEditar);

    if (contacto) {
        res.render('editar', { contacto });
    } else {
        res.redirect('/');
    }
});


router.post('/actualizar/:id', (req, res) => {
    const idEditar = parseInt(req.params.id);
    const { nombre, telefono, email } = req.body;
    let contactos = leerContactos();
    
    const indice = contactos.findIndex(c => c.id === idEditar);
    if (indice !== -1) {
        contactos[indice] = { ...contactos[indice], nombre, telefono, email };
        guardarContactos(contactos);
    }
    res.redirect('/');
});

module.exports = router;