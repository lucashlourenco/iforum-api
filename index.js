// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const database = require('./db');
const routerUsuario = require('./Routes/UsuarioRoutes');
const routerCursos = require('./Routes/CursosRoutes');
const routerDisciplinas = require('./Routes/DisciplinasRoutes');
const routerPerguntas = require('./Routes/PerguntasRoutes');
const routerRespostas = require('./Routes/RespostasRoutes');
const routerComentarios = require('./Routes/ComentariosRoutes');
const PORT = process.env.PORT;

dotenv.config();
const app = express();


app.use(bodyParser.json());

app.use(routerUsuario);
app.use(routerCursos);
app.use(routerDisciplinas);
app.use(routerPerguntas);
app.use(routerRespostas);
app.use(routerComentarios);

database.authenticate()
  .then(() => {
    console.log('Conectado ao MySQL');
  })
  .catch( err => {
    console.log('Erro ao conectar com o MySQL', err.message);
  });

database.sync()
  .then(() => {
    console.log('Tabelas criadas')
  })
  .catch( err => {
    console.log('Erro ao sincronizar modelos: ', err)
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
