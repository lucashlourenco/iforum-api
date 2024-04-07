const Cursos = require('../models/Cursos');

const express = require('express');

const router = express.Router();

const ComentariosController = require('../Controllers/ComentariosController')

router.get('/comentarios', ComentariosController.getAll);
router.get('/comentarios/:id', ComentariosController.getById)
router.post('/comentarios', ComentariosController.create);
router.put('/comentarios/:id', ComentariosController.update);
router.delete('/comentarios/:id', ComentariosController.delete);

router.get('/', (req, res)=>{
    res.send("teste")
});

module.exports = router;