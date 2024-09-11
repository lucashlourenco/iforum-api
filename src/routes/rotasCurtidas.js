const express = require('express');
const router = express.Router();
const curtidasController = require('../controller/curtidasController');

router.post('/toggle', curtidasController.toggleCurtida);
router.get('/:id_usuario/:id_pergunta', curtidasController.verificarCurtidasUsuario);

module.exports = router;
