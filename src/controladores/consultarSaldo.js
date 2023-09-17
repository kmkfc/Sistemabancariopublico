const contas = require('../bancodedados');

const consultarSaldoBancario = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(401).json({ mensagem: 'Número da conta e senha são obrigatórios.' });
    }

    const conta = contas.contas.find(conta => conta.numero === parseInt(numero_conta));

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada em nosso sistema.' });
    }

    if (conta.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'A senha informada está incorreta.' });
    }

    const consultaDeSaldo = conta.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });


    res.json({ saldo: consultaDeSaldo }); 
}

module.exports = { consultarSaldoBancario}