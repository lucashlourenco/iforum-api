const express = require('express')
const app = express()
app.use(express.json());

const cursoController = require('../controller/cursoController.js')

const router = express.Router()


router.get('/', cursoController.buscarCursos);
router.post('/', cursoController.criarCurso)
router.put('/:id', cursoController.atualizarCurso)
router.get('/:id', cursoController.buscarCursoPorId)
router.get('/:id/disciplinas', cursoController.buscarDisciplinasPorCurso)

router.get('/:id/periodos', cursoController.buscarQuantidadePeriodos)

router.delete('/:id', cursoController.deletarCurso)


module.exports = router;
