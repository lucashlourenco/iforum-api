const express = require('express')
const app = express()
app.use(express.json());

const perguntaController = require("../controller/perguntaController.js")

const router = express.Router()


router.get('/', perguntaController.buscarPerguntas);
router.post('/', perguntaController.criarPergunta)
router.put('/:id', perguntaController.atualizarPergunta)
router.delete('/:id', perguntaController.deletarPergunta)



module.exports = router;
