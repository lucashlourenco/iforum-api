const Perguntas = require('../models/Perguntas');

const express = require('express');

const router = express.Router();

const PerguntasController = require('../Controllers/PerguntasController');

router.get('/perguntas', PerguntasController.getAll);
router.get('/perguntas/:id', PerguntasController.getById)
router.post('/perguntas', PerguntasController.create);
router.put('/perguntas/:id', PerguntasController.update);
router.delete('/perguntas/:id', PerguntasController.delete);

router.get('/', (req, res)=>{
    res.send("teste")
});

module.exports = router;