const contas = require('../bancodedados');
const { format } = require('date-fns');

const depositarNaConta = (req, res) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta || valor === undefined || valor === null) {
        return res.status(401).json({ mensagem: 'Por favor, forneça todas as informações necessárias.' });
    }
    
    const conta = contas.contas.find(conta => conta.numero === parseInt(numero_conta));

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada em nosso sistema.' });
    } 
 

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'Não é possivel depositar valores zerados ou negativos.' })
    }

    const formatoMoeda = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const dataHora = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
    contas.depositos.push({
    data: dataHora,
    numero_conta: numero_conta,
    valor: valor,
    });

    conta.saldo += valor;

    res.json({mensagem: `Deposito de ${formatoMoeda} realizado com sucesso`})
}

module.exports = { depositarNaConta };