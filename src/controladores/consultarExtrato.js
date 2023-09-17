const contas = require('../bancodedados');

const consultarExtratoBancario = (req, res) => {
  const { numero_conta, senha } = req.query;

  if (!numero_conta || !senha) {
    return res.status(400).json({ mensagem: 'Informe o número da conta e a senha.' });
  }

  const conta = contas.contas.find((conta) => conta.numero === parseInt(numero_conta));

  if (!conta) {
    return res.status(404).json({ mensagem: 'Conta não encontrada em nosso sistema.' });
  }

  if (conta.usuario.senha !== senha) {
    return res.status(401).json({ mensagem: 'A senha informada está incorreta.' });
  }

  const saques = contas.saques.filter((saque) => saque.numero_conta === numero_conta);
  const depositos = contas.depositos.filter((deposito) => deposito.numero_conta === numero_conta);
  const transferenciasEnviadas = contas.transferencias.filter(
    (transferencia) => transferencia.numero_conta_origem === numero_conta
  );
  const transferenciasRecebidas = contas.transferencias.filter(
    (transferencia) => transferencia.numero_conta_destino === numero_conta
  );

  const extrato = {
    depositos,
    saques,
    transferenciasEnviadas,
    transferenciasRecebidas,
  };

  res.status(200).json(extrato);
};

module.exports = { consultarExtratoBancario };