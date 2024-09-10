const express = require("express");
const app = express();
app.use(express.json());

const userController = require("../controller/userController.js");

const router = express.Router();

router.get("/", userController.buscarUsuarios);
router.post("/", userController.criarUsuario);
router.put("/:id", userController.atualizarUsuario);
router.get("/:id", userController.buscarUsuarioPorId);
router.get('/:usuarioId/contagem', userController.contarRespostasEComentariosPorUsuario);

router.delete("/:id", userController.deletarUsuario);
router.post("/login", userController.loginUsuarios);

module.exports = router;
