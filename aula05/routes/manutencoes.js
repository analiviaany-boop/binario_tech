const express = require('express');
const router = express.Router();

// Banco de dados em memoria
let manutencoes =  [
	{ id: 1, placaCaminhao: "ABC-1234", descricao: "Troca de oleo e filtros", valorEstimado: 850.00, status: "Pendente" },
	{ id: 2, placaCaminhao: "XYZ-9876", descricao: "Revisao de sistema de freios", valorEstimado: 2300.00, status: "Aprovado" }
];

// GET: Listar todas as manutenções (orçamentos)
router.get('/', (req, res) => {
	res.status(200).json(manutencoes);
});

// POST: Cadastrar um novo orçamento de manutencao
router.post('/', (req, res) => {
	const { placa, descricao, valorEstimado, dataPrevisao } = req.body

	// Validacao simples dos dados recebidos
	if (!placa || !descricao || !valorEstimado) {
		return res.status(400).json({
			erro: 'Dados incompletos. Informe placaCaminhao, descricao e valorEstimado.'
		});
	}

	// Criacao do objeto do novo orçamento
	const novoOrcamento = {
		id: manutencoes.length > 0 ? manutencoes[manutencoes.legth - 1].id + 1 :1,
		placa,
		descricao,
		valorEstimado,
		dataPrevisao: dataPrevisao || new Date().toISOString().split('T')[0],
		status: 'Pendente',
		dataCriacao: new Date()
	};

	// Salva no "banco de dados"
	manutencoes.push(novoOrcamento);

	// Retorna sucesso
	res.status(201).json({
		mensagem: 'Orcamento de manutencao cadastrado com sucesso!',
		manutencao: novoOrcamento
	});
});

module.exports = router;
