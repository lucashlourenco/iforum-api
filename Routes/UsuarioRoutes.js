const Usuarios = require('../models/Usuarios');

const express = require('express');

const router = express.Router();

const UsuariosController = require('../Controllers/UsuariosController')

router.get('/usuarios', UsuariosController.getAll);
router.get('/usuarios/:id', UsuariosController.getById)
router.post('/usuarios', UsuariosController.create);
router.put('/usuarios/:id', UsuariosController.update);
router.delete('/usuarios/:id', UsuariosController.delete);

router.get('/', (req, res)=>{
    res.send("teste")
});

module.exports = router;