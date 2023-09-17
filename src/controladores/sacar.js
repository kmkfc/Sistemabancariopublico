const contas = require('../bancodedados');
const { format } = require('date-fns');

const sacarValores = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta || valor === undefined || valor === null || !senha) {
        return res.status(401).json({ mensagem: 'Por favor, forneça todas as informações necessárias.' });
    }

    
    const conta = contas.contas.find(conta => conta.numero === parseInt(numero_conta));

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada em nosso sistema.' })
    }

    if (conta.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'A senha informada está incorreta.' });
    }

    const saldoAtual = conta.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    if (conta.saldo <= 0) {
        return res.status(401).json({ mensagem: `Não existe saldo positivo na conta para ser sacado.` });
    }

    if (valor > conta.saldo) {
        return res.status(401).json({ mensagem: `Seu saldo atual é: ${saldoAtual}. escolha um valor igual ou menor.` });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'Não é possivel sacar valores zerados ou negativos, informe valores maiores que zero.' })
    }

    const valorDeSaque = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const dataHora = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
    contas.saques.push({
    data: dataHora,
    numero_conta: numero_conta,
    valor: valor,
    }); 

    conta.saldo -= valor;

    res.status(200).json({ mensagem: `Sucesso, foi sacado ${valorDeSaque} da sua conta.` });
}



module.exports = { sacarValores }