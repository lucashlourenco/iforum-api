const express = require('express')
const app = express()
app.use(express.json());

const Usuarios = require("./models/usuariosdb.js");
const Cursos = require("./models/cursosdb.js");
const Disciplinas = require("./models/disciplinasdb.js");
const Perguntas =  require("./models/perguntasdb");
const Respostas = require("./models/respostasdb") ;
const Comentarios = require(".//models/comentariosdb")

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
        let novoUsuario = await Usuarios.create({
            nome,
            email,
            senha
        });
        console.log("Novo usuário criado:", novoUsuario);

        response.status(201).json(novoUsuario);
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
            usuarios.nome = nome ? nome : usuarios.nome;
            usuarios.email = email ? email : usuarios.email;
            usuarios.senha = senha ? senha : usuarios.senha;
            await usuarios.save();
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

app.get('/cursos', async function (request, response) {
    try {
        let cursos = await Cursos.findAll();
        response.status(200).json(cursos);
    } catch (error) {
        console.error("Erro ao buscar os cursos:", error);
        response.status(500).json({ error: "Erro ao buscar os cursos" });
    }
});

app.post('/cursos', async function (request, response) {
    try {
        const {nome} = request.body;
        let novoCurso = await Cursos.create({
            nome
        });
        console.log("Novo curso criado:", novoCurso);

        response.status(201).json(novoCurso);
    } catch (error) {
        console.error("Erro ao criar curso:", error);
        response.status(500).json({ error: "Erro ao criar curso" });
    }
});

app.put('/cursos/:id', async function (request, response) {
    try {
        let id = request.params.id;
        let {nome} = request.body;
        let cursos = await Cursos.findByPk(id);
        if (cursos) {
            cursos.nome = nome ? nome : cursos.nome;
            await cursos.save();
            response.status(200).json(cursos);
        } else {
            response.status(404).json({ error: "Usuário não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        response.status(500).json({ error: "Erro ao atualizar curso" });
    }
});

app.delete('/cursos/:id', async function (request, response) {
    try {
        let id = request.params.id;
        let cursos = await Cursos.findByPk(id);
        if (cursos) {
            await cursos.destroy();
            response.status(200).json({ message: "Curso deletado com sucesso" });
        } else {
            response.status(404).json({ error: "Curso não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao deletar curso:", error);
        response.status(500).json({ error: "Erro ao deletar curso" });
    }
});

app.get('/disciplinas', async function (request, response) {
    try {
        let disciplinas = await Disciplinas.findAll();
        response.status(200).json(disciplinas);
    } catch (error) {
        console.error("Erro ao buscar os disciplinas:", error);
        response.status(500).json({ error: "Erro ao buscar os disciplinas" });
    }
});

app.post('/disciplinas', async function (request, response) {
    try {
        const {nome, periodo, curso_id} = request.body;
        let novaDisciplina = await Disciplinas.create({
            nome,
            periodo,
            curso_id
        });
        console.log("Nova disciplina criada:", novaDisciplina);

        response.status(201).json(novaDisciplina);
    } catch (error) {
        console.error("Erro ao criar disciplina:", error);
        response.status(500).json({ error: "Erro ao criar disciplina" });
    }
});

app.put('/disciplinas/:id', async function (request, response) {
    try {
        let id = request.params.id;
        let {nome, periodo, curso_id} = request.body;
        let disciplinas = await Disciplinas.findByPk(id);
        if (disciplinas) {
            disciplinas.nome = nome ? nome : disciplinas.nome;
            disciplinas.periodo = periodo ? periodo : disciplinas.periodo;
            disciplinas.curso_id = curso_id ? curso_id : disciplinas.curso_id;
            await disciplinas.save();
            response.status(200).json(disciplinas);
        } else {
            response.status(404).json({ error: "Disciplina não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao atualizar disciplina:", error);
        response.status(500).json({ error: "Erro ao atualizar disciplina" });
    }
});

app.delete('/disciplinas/:id', async function (request, response) {
    try {
        let id = request.params.id;
        let disciplinas = await Disciplinas.findByPk(id);
        if (disciplinas) {
            await disciplinas.destroy();
            response.status(200).json({ message: "Disciplina deletada com sucesso" });
        } else {
            response.status(404).json({ error: "Disciplina não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao deletar disciplina:", error);
        response.status(500).json({ error: "Erro ao deletar disciplina" });
    }
});

app.get('/perguntas', async function (request, response) {
    try {
        let perguntas = await Perguntas.findAll();
        response.status(200).json(perguntas);
    } catch (error) {
        console.error("Erro ao buscar as pertguntas:", error);
        response.status(500).json({ error: "Erro ao buscar as perguntas" });
    }
});

app.post('/perguntas', async function (request, response) {
    try {
        const {descricao, usuario_id, disciplina_id} = request.body;
        let novaPergunta = await Perguntas.create({
            descricao,
            usuario_id,
            disciplina_id
        });
        console.log("Nova pergunta criada:", novaPergunta);

        response.status(201).json(novaPergunta);
    } catch (error) {
        console.error("Erro ao criar pergunta:", error);
        response.status(500).json({ error: "Erro ao criar pergunta" });
    }
});

app.put('/perguntas/:id', async function (request, response) {
    try {
        let id = request.params.id;
        let {descricao, usuario_id, disciplina_id} = request.body;
        let perguntas = await Perguntas.findByPk(id);
        if (perguntas) {
            perguntas.descricao = descricao ? descricao : perguntas.descricao;
            perguntas.usuario_id = usuario_id ? usuario_id : perguntas.usuario_id;
            perguntas.disciplina_id = disciplina_id ? disciplina_id : perguntas.disciplina_id;
            await perguntas.save();
            response.status(200).json(perguntas);
        } else {
            response.status(404).json({ error: "Pergunta não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao atualizar pergunta:", error);
        response.status(500).json({ error: "Erro ao atualizar pergunta" });
    }
});

app.delete('/perguntas/:id', async function (request, response) {
    try {
        let id = request.params.id;
        let perguntas = await Perguntas.findByPk(id);
        if (perguntas) {
            await perguntas.destroy();
            response.status(200).json({ message: "Pergunta deletada com sucesso" });
        } else {
            response.status(404).json({ error: "Pergunta não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao deletar Pergunta:", error);
        response.status(500).json({ error: "Erro ao deletar pergunta" });
    }
});

app.get('/respostas', async function (request, response) {
    try {
        let respostas = await Respostas.findAll();
        response.status(200).json(respostas);
    } catch (error) {
        console.error("Erro ao buscar respostas:", error);
        response.status(500).json({ error: "Erro ao buscar respostas" });
    }
});

app.post('/respostas', async function (request, response) {
    try {
        const {id_usuario, descricao, pergunta_id} = request.body;
        let novaResposta = await Respostas.create({
            id_usuario,
            descricao,
            pergunta_id
        });
        console.log("Nova resposta criada:", novaResposta);

        response.status(201).json(novaResposta);
    } catch (error) {
        console.error("Erro ao criar resposta:", error);
        response.status(500).json({ error: "Erro ao criar resposta" });
    }
});

app.put('/respostas/:id', async function (request, response) {
    try {
        let id = request.params.id;
        let {id_usuario, descricao, pergunta_id} = request.body;
        let respostas = await Respostas.findByPk(id);
        if (respostas) {
            respostas.id_usuario = id_usuario ? id_usuario : respostas.id_usuario;
            respostas.descricao = descricao ? descricao : respostas.descricao;
            respostas.pergunta_id = pergunta_id ? pergunta_id : respostas.pergunta_id;
            await respostas.save();
            response.status(200).json(respostas);
        } else {
            response.status(404).json({ error: "Resposta não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao atualizar resposta:", error);
        response.status(500).json({ error: "Erro ao atualizar resposta" });
    }
});

app.delete('/respostas/:id', async function (request, response) {
    try {
        let id = request.params.id;
        let respostas = await Respostas.findByPk(id);
        if (respostas) {
            await respostas.destroy();
            response.status(200).json({ message: "Resposta deletada com sucesso" });
        } else {
            response.status(404).json({ error: "Resposta não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao deletar Resposta:", error);
        response.status(500).json({ error: "Erro ao deletar resposta" });
    }
});

app.get('/comentarios', async function (request, response) {
    try {
        let comentarios = await Comentarios.findAll();
        response.status(200).json(comentarios);
    } catch (error) {
        console.error("Erro ao buscar comentários:", error);
        response.status(500).json({ error: "Erro ao buscar comentários" });
    }
});

app.post('/comentarios', async function (request, response) {
    try {
        const {id_usuario, descricao, id_resposta} = request.body;
        let novoComentario = await Comentarios.create({
            id_usuario,
            descricao,
            id_resposta
        });
        console.log("Novo comentário criado:", novoComentario);

        response.status(201).json(novoComentario);
    } catch (error) {
        console.error("Erro ao criar comentário:", error);
        response.status(500).json({ error: "Erro ao criar comentário" });
    }
});

app.put('/comentarios/:id', async function (request, response) {
    try {
        let id = request.params.id;
        let {id_usuario, descricao, id_resposta} = request.body;
        let comentarios = await Comentarios.findByPk(id);
        if (comentarios) {
            comentarios.id_usuario = id_usuario ? id_usuario : comentarios.id_usuario;
            comentarios.descricao = descricao ? descricao : comentarios.descricao;
            comentarios.id_resposta = id_resposta ? id_resposta : comentarios.id_resposta;
            await comentarios.save();
            response.status(200).json(comentarios);
        } else {
            response.status(404).json({ error: "Comentário não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao atualizar comentário:", error);
        response.status(500).json({ error: "Erro ao atualizar comentário" });
    }
});

app.delete('/comentarios/:id', async function (request, response) {
    try {
        let id = request.params.id;
        let comentarios = await Comentarios.findByPk(id);
        if (comentarios) {
            await comentarios.destroy();
            response.status(200).json({ message: "Comentário deletado com sucesso" });
        } else {
            response.status(404).json({ error: "Comentário não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao deletar comentário:", error);
        response.status(500).json({ error: "Erro ao deletar comentário" });
    }
});

app.listen(8080, () => console.log('O servidor está funcionando.'));