const Disciplinas = require('../models/Disciplinas');

const express = require('express');

const router = express.Router();

const DisciplinasController = require('../Controllers/DisciplinasController')

router.get('/disciplinas', DisciplinasController.getAll);
router.get('/disciplinas/:id', DisciplinasController.getById)
router.post('/disciplinas', DisciplinasController.create);
router.put('/disciplinas/:id', DisciplinasController.update);
router.delete('/disciplinas/:id', DisciplinasController.delete);

router.get('/', (req, res)=>{
    res.send("teste")
});

module.exports = router;