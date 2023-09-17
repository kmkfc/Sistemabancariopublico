const contas = require('../bancodedados');
const validarEmail = require('validator')

const criarContaBancaria = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (cpf && (!/^\d{11}$/.test(cpf) || cpf.length !== 11)) {
    return res.status(400).json({ mensagem: 'CPF deve conter exatamente 11 dígitos numéricos.' });
  }

  if (!validarEmail.isEmail(email)) {
    return res.status(400).json({ mensagem: 'Endereço de E-mail fornecido inválido.' });
  }

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(400).json({ mensagem: 'Campos obrigatórios não preenchidos.' });
  }

  if (contas.contas.some((conta) => conta.usuario.cpf === cpf)) {
    return res.status(400).json({ mensagem: 'CPF já cadastrado em outra conta.' });
  }

  if (contas.contas.some((conta) => conta.usuario.email === email)) {
    return res.status(400).json({ mensagem: 'Email já cadastrado em outra conta.' });
  }
 
  const numero = Math.floor(Math.random() * 10000);

  const conta = {
    numero,
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
    },
  };

  contas.contas.push(conta);

  res.status(201).json(conta);
};

module.exports = { criarContaBancaria };