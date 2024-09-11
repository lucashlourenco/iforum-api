const express = require('express')
const app = express()
app.use(express.json());

const respostaController = require("../controller/respostaController.js")
const comentarioController = require("../controller/comentarioController");

const router = express.Router()


router.get('/', respostaController.buscarRespostas);
router.get('/:id', respostaController.buscarRespostaPorId)
router.get('/:perguntaId/respostas', respostaController.buscarRespostasPorPerguntaId)
router.get('/:respostaId/comentarios', respostaController.buscarComentariosPorRespostaId);

router.post('/', respostaController.criarResposta)
router.put('/:id', respostaController.atualizarResposta)
router.delete('/:id', respostaController.deletarResposta)
router.get('/buscar/:string', respostaController.buscarRespostasPorString)

router.post('/:id/like', respostaController.adicionarLike);
router.post('/:id/dislike', respostaController.removerLike);


module.exports = router;
