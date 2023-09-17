const contas = require('../bancodedados');

const listarContasBancarias = (req, res) => {
  const senhaInformada = req.query.senha_banco;

  if (!senhaInformada || senhaInformada !== contas.banco.senha) {
      return res.status(401).json({ mensagem: 'Senha incorreta :) .' });
  }
  res.json(contas.contas);
}; 


module.exports = { listarContasBancarias }