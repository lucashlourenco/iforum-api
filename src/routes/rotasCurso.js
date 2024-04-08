const express = require('express')
const app = express()
app.use(express.json());

const cursoController = require('../controller/cursoController.js')

const router = express.Router()


router.get('/', cursoController.buscarCursos);
router.post('/', cursoController.criarCurso)
router.put('/:id', cursoController.atualizarCurso)
router.delete('/:id',cursoController.deletarCurso)



module.exports = router;
