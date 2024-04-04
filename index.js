const express = require('express')
const app = express()
app.use(express.json());

const Usuarios = require("./src/models/usuariosdb.js");
const Cursos = require("./src/models/cursosdb.js");
const Disciplinas = require("./src/models/disciplinasdb.js");
const Perguntas =  require("./src/models/perguntasdb.js");
const Respostas = require("./src/models/respostasdb.js") ;
const Comentarios = require("./src/models/comentariosdb.js")
const userController = require("./src/controller/userController.js")
const cursoController = require("./src/controller/cursoController.js")
const disciplinaController = require("./src/controller/disciplinaController.js")
const perguntaController = require("./src/controller/perguntaController")
const comentarioController = require("./src/controller/comentarioController")
const rotasUsuario = require("./src/routes/rotasUsuario.js")
const rotasCurso = require("./src/routes/rotasCurso.js")
const rotasDisciplina = require('./src/routes/rotasDisicplina.js')
const rotasPergunta = require('./src/routes/rotasPergunta.js')
const rotasResposta = require('./src/routes/rotasRespostas.js')
const rotasComentario = require('./src/routes/rotasComentario.js')


const syncDatabase = require("./syncDb.js");

syncDatabase().then(()=>{
    console.log("Tabelas criadas")
}).catch((err)=> {
    console.log("Erro: ", err)
})

app.use('/usuarios', rotasUsuario)

app.use('/cursos',rotasCurso)

app.use('/disciplinas', rotasDisciplina)

app.use('/perguntas', rotasPergunta)


app.use('/respostas',rotasResposta)

app.use("/comentarios", rotasComentario)

app.listen(8080, () => console.log('O servidor está funcionando.'));