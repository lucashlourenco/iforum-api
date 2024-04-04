const express = require('express')
const app = express()
app.use(express.json());

const disciplinaController = require("../controller/disciplinaController.js")

const router = express.Router()


router.get('/', disciplinaController.buscarDisciplinas);
router.post('/', disciplinaController.criarDisciplina)
router.put('/:id', disciplinaController.atualizarDisciplina)
router.delete('/:id', disciplinaController.deletarDisciplina)



module.exports = router;
