const contas = require('../bancodedados');

const excluirContaBancaria = (req, res) => {
    const { numeroConta } = req.params;

    const contaI = contas.contas.findIndex(conta => conta.numero === parseInt(numeroConta));

    if (contaI === -1) {
        return res.status(404).json({ mensagem: 'Conta não encontrada em nosso sistema.' });
    } 

    if (contas.contas[contaI].saldo !== 0) {
        return res.status(400).json({ mensagem: 'Não é possivel excluir conta com valores.' });
    } 

    contas.contas.splice(contaI, 1);

    res.json({ mensagem: 'Conta excluída com sucesso.' });
}; 

module.exports = { excluirContaBancaria }