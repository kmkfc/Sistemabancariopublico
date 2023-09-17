const contas = require('../bancodedados');
const validarEmail = require('validator');
 
const atualizarUsuario = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const conta = contas.contas.find(conta => conta.numero === parseInt(numeroConta)); 

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada em nosso sistema.' });
    }

    if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
        return res.status(400).json({ mensagem: 'Nenhum campo para atualização foi fornecido.' });
    }

    if (cpf && (!/^\d{11}$/.test(cpf) || cpf.length !== 11)) {
        return res.status(400).json({ mensagem: 'CPF deve conter exatamente 11 dígitos numéricos.' });
    }

    if (cpf && contas.contas.some(conta => conta.usuario.cpf === cpf && conta.numero !== parseInt(numeroConta))) {
        return res.status(400).json({ mensagem: 'CPF já cadastrado em outra conta.' });
    }

    if (email && contas.contas.some(conta => conta.usuario.email === email && conta.numero !== parseInt(numeroConta))) {
        return res.status(400).json({ mensagem: 'E-mail já cadastrado em outra conta.' });
    }

    if (email && !validarEmail.isEmail(email)) {
        return res.status(400).json({ mensagem: 'Endereço de E-mail fornecido inválido.' });
    }

    if (nome) {
        conta.usuario.nome = nome;
    }
    if (cpf) {
        conta.usuario.cpf = cpf;
    }
    if (data_nascimento) {
        conta.usuario.data_nascimento = data_nascimento;
    }
    if (telefone) {
        conta.usuario.telefone = telefone;
    }
    if (email) {
        conta.usuario.email = email;
    }
    if (senha) {
        conta.usuario.senha = senha;
    }

    res.json({ mensagem: 'Conta atualizada com sucesso' });
};

module.exports = { atualizarUsuario };