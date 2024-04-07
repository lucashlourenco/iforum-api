const Respostas = require('../models/Respostas');

const express = require('express');

const router = express.Router();

const RespostasController = require('../Controllers/RespostasController');

router.get('/respostas', RespostasController.getAll);
router.get('/respostas/:id', RespostasController.getById)
router.post('/respostas', RespostasController.create);
router.put('/respostas/:id', RespostasController.update);
router.delete('/respostas/:id', RespostasController.delete);

router.get('/', (req, res)=>{
    res.send("teste")
});

module.exports = router;