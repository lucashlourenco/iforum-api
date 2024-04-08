const express = require('express')
const app = express()
app.use(express.json());

const respostaController = require("../controller/respostaController.js")

const router = express.Router()


router.get('/', respostaController.buscarRespostas);
router.post('/', respostaController.criarResposta)
router.put('/:id', respostaController.atualizarResposta)
router.delete('/:id', respostaController.deletarResposta)



module.exports = router;
