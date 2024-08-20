const Usuarios = require("../models/usuariosdb.js");

const buscarUsuarios = async (request, response) => {
  try {
    let usuarios = await Usuarios.findAll();
    response.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    response.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

const loginUsuarios = async (request, response) => {
  try {
    const { email, senha } = request.body;
    let usuarios = await Usuarios.findAll({
      where: {
        email: email,
        senha: senha,
      },
    });
    response.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    response.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

const criarUsuario = async (request, response) => {
  try {
    const { nome, email, senha } = request.body;

    const emailRegex = /^(.*@discente\.ifpe\.edu\.br|.*@jaboatao\.ifpe\.edu\.br)$/;

    if (!emailRegex.test(email)) {
      return response.status(400).json({ error: "Você não pode se cadastrar com um e-mail pessoal!" });
    }

    let usuarioExistente = await Usuarios.findOne({ where: { email } });
    if (usuarioExistente) {
      return response.status(400).json({ error: "Há um usuário com o e-mail já cadastrado!" });
    }

    let novoUsuario = await Usuarios.create({
      nome,
      email,
      senha,
    });

    console.log("Novo usuário criado:", novoUsuario);
    response.status(201).json(novoUsuario);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    response.status(500).json({ error: "Erro ao criar usuário" });
  }
};

const atualizarUsuario = async (request, response) => {
  try {
    let id = request.params.id;
    let { nome, email, senha } = request.body;
    let usuarios = await Usuarios.findByPk(id);
    if (usuarios) {
      usuarios.nome = nome ? nome : usuarios.nome;
      usuarios.email = email ? email : usuarios.email;
      usuarios.senha = senha ? senha : usuarios.senha;
      await usuarios.save();
      response.status(200).json(usuarios);
    } else {
      response.status(404).json({ error: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    response.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};

const deletarUsuario = async (request, response) => {
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
};

module.exports = {
  buscarUsuarios,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
  loginUsuarios
};
