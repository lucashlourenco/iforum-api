const express = require('express')
const app = express()
app.use(express.json());

const userController = require("../controller/userController.js")

const router = express.Router()


router.get('/', userController.buscarUsuarios);
router.post('/', userController.criarUsuario)
router.put('/:id', userController.atualizarUsuario)
router.delete('/:id ', userController.deletarUsuario)



module.exports = router;
