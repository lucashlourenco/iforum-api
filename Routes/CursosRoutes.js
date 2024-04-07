const Cursos = require('../models/Cursos');

const express = require('express');

const router = express.Router();

const CursosController = require('../Controllers/CursosController')

router.get('/cursos', CursosController.getAll);
router.get('/cursos/:id', CursosController.getById)
router.post('/cursos', CursosController.create);
router.put('/cursos/:id', CursosController.update);
router.delete('/cursos/:id', CursosController.delete);

router.get('/', (req, res)=>{
    res.send("teste")
});

module.exports = router;