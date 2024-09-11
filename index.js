const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

const Usuarios = require("./src/models/usuariosdb.js");
const Cursos = require("./src/models/cursosdb.js");
const Disciplinas = require("./src/models/disciplinasdb.js");
const Perguntas = require("./src/models/perguntasdb.js");
const Respostas = require("./src/models/respostasdb.js");
const Comentarios = require("./src/models/comentariosdb.js");
const userController = require("./src/controller/userController.js");
const cursoController = require("./src/controller/cursoController.js");
const disciplinaController = require("./src/controller/disciplinaController.js");
const perguntaController = require("./src/controller/perguntaController");
const comentarioController = require("./src/controller/comentarioController");
const rotasUsuario = require("./src/routes/rotasUsuario.js");
const rotasCurso = require("./src/routes/rotasCurso.js");
const rotasDisciplina = require("./src/routes/rotasDisicplina.js");
const rotasPergunta = require("./src/routes/rotasPergunta.js");
const rotasResposta = require("./src/routes/rotasRespostas.js");
const rotasComentario = require("./src/routes/rotasComentario.js");
const rotasCurtidas = require("./src/routes/rotasCurtidas");
const {Sequelize} = require('sequelize');
const populateDatabase = require('./src/helpers/populateDb.js')
const syncDatabase = require("./syncDb.js");
syncDatabase();


app.use("/usuarios", rotasUsuario);

app.use("/cursos", rotasCurso);

app.use("/disciplinas", rotasDisciplina);

app.use("/perguntas", rotasPergunta);

app.use("/respostas", rotasResposta);

app.use("/comentarios", rotasComentario);

app.use("/curtidas", rotasCurtidas);


app.listen(8081, () => console.log("O servidor está funcionando."));
