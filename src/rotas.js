const express = require('express');
const rotas = express(); 

const { criarContaBancaria } = require('./controladores/criarContas');
const { listarContasBancarias } = require('./controladores/listarContas');
const { atualizarUsuario } = require('./controladores/atualizarUsuario');
const { excluirContaBancaria } = require('./controladores/excluirContas');
const { depositarNaConta } = require('./controladores/depositar');
const { sacarValores } = require('./controladores/sacar');
const { transferenciaEntreContas } = require('./controladores/transferir');
const { consultarSaldoBancario } = require('./controladores/consultarSaldo');
const { consultarExtratoBancario } = require('./controladores/consultarExtrato');

rotas.post('/contas', criarContaBancaria);
rotas.get('/contas', listarContasBancarias);
rotas.put('/contas/:numeroConta/usuario', atualizarUsuario);
rotas.delete('/contas/:numeroConta', excluirContaBancaria);
rotas.post('/transacoes/depositar', depositarNaConta)
rotas.post('/transacoes/sacar', sacarValores)
rotas.post('/transacoes/transferir', transferenciaEntreContas)
rotas.get('/contas/saldo', consultarSaldoBancario)
rotas.get('/contas/extrato', consultarExtratoBancario);

module.exports = {rotas};