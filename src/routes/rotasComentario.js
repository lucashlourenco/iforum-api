const express = require('express')
const app = express()
app.use(express.json());

const comentarioController = require("../controller/comentarioController.js")

const router = express.Router()


router.get('/', comentarioController.buscarComentarios);
router.post('/', comentarioController.criarComentario)
router.put('/:id', comentarioController.atualizarComentario)
router.delete('/:id', comentarioController.deletarComentario)



module.exports = router;
