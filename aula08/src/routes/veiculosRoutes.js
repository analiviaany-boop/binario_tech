const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const veiculosController = require('../controllers/veiculosController');

router.get('/', veiculosController.listarTodos);
router.get('/:id', veiculosController.buscarPorId);
router.post('/', veiculosController.criar);

router.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (status === undefined) {
            return res.status(400).json({ erro: "O campo 'status' é obrigatório." });
        }

        const linhasAfetadas = await db('veiculos').where({ id }).update({ status });

        if (!linhasAfetadas) {
            return res.status(404).json({ erro: "Veículo não encontrado." });
        }

        const veiculoAtualizado = await db('veiculos').where({ id }).first();
        res.status(200).json(veiculoAtualizado);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao atualizar o status do veículo." });
    }
});

module.exports = router;
