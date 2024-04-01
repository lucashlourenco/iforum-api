const express = require('express')
const app = express()
app.use(express.json());

const Usuarios = require("./models/usuariosdb.js");
const Curso = require("./models/cursosdb.js");
const Disciplina = require("./models/disciplinasdb.js");
const Pergunta =  require("./models/perguntasdb");
const Resposta = require("./models/respostasdb") ;
const Comentario = require(".//models/comentariosdb")

app.get('/usuarios', async function (request, response) {
    try {
        let usuarios = await Usuarios.findAll();
        response.status(200).json(usuarios);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        response.status(500).json({ error: "Erro ao buscar usuários" });
    }
});


app.post('/usuarios', async function (request, response) {
    try {
        const {nome, email, senha} = request.body;
        let newUser = await Usuarios.create({
            nome,
            email,
            senha
        });
        console.log("Novo usuário criado:", newUser);

        response.status(201).json(newUser);
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        response.status(500).json({ error: "Erro ao criar usuário" });
    }
});

app.put('/usuarios/:id', async function (request, response) {
    try {
        let id = request.params.id;
        let {nome, email, senha} = request.body;
        let usuarios = await Usuarios.findByPk(id);
        if (usuarios) {
            usuarios.nome = nome ? nome : usuario.nome;
            usuarios.email = email ? email : usuario.email;
            usuarios.senha = senha ? senha : usuario.senha;
            await usuario.save();
            response.status(200).json(usuario);
        } else {
            response.status(404).json({ error: "Usuário não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        response.status(500).json({ error: "Erro ao atualizar usuário" });
    }
});

app.delete('/usuarios/:id', async function (request, response) {
    try {
        let id = request.params.id;
        let usuarios = await Usuarios.findByPk(id);
        if (usuarios) {
            await usuarios.destroy();
            response.status(200).json({ message: "Usuário deletado com sucesso" });
        } else {
            response.status(404).json({ error: "Usuário não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        response.status(500).json({ error: "Erro ao deletar usuário" });
    }
});


app.listen(8080, () => console.log('O servidor está funcionando.'));