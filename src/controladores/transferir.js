const contas = require('../bancodedados');
const { format } = require('date-fns');


const transferenciaEntreContas = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem || !numero_conta_destino || valor === undefined || valor === null || !senha) {
        return res.status(401).json({ mensagem: 'Por favor, forneça todas as informações necessárias.' });
    }

    const contaOrigem = contas.contas.find(conta => conta.numero === parseInt(numero_conta_origem));
    const contaDestino = contas.contas.find(conta => conta.numero === parseInt(numero_conta_destino));

    if (!contaOrigem) {
        return res.status(401).json({ mensagem: 'Conta origem não encontrada em nosso sistema.' });
    }
 
    if (!contaDestino) {
        return res.status(401).json({ mensagem: 'Conta destino não encontrada em nosso sistema.' });
    }

    if (contaOrigem === contaDestino) {
        return res.status(401).json({ mensagem: `Não é possivel realizar transferências para a mesma conta.` });
    }

    if (contaOrigem.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'A senha informada está incorreta.' });
    }

    if (isNaN(valor) || valor <= 0) {
        return res.status(400).json({ mensagem: 'Não é possivel transferir valores zerados ou negativos.' });
    }

    const valorTransferencia = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const saldoContaOrigem = contaOrigem.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    if (valor > contaOrigem.saldo) {
        return res.status(401).json({ mensagem: `Saldo insuficiente para realizar a transferência. Seu saldo atual é: ${saldoContaOrigem}.` });
    }


    const dataHora = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
    const transacaoTransferencia = {
        data: dataHora,
        numero_conta_origem: numero_conta_origem,
        numero_conta_destino: numero_conta_destino,
        valor: valor,
    };

    contas.transferencias.push(transacaoTransferencia);

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    res.status(200).json({ mensagem: `Transferência de ${valorTransferencia} realizada com sucesso para a conta '${numero_conta_destino}'.` });
}

module.exports = { transferenciaEntreContas }