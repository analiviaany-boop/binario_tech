const express = require('express');
const app = express();
const PORT = 3099;

app.use(express.json());

// Rota /api/v1/scania
app.get('/api/v1/scania', (req, res) => {
	res.json({ montadora: "Scania", modelo: "R450", status: "OK", conexao: true, velocidade_media: 82});
});

// Rota /api/v1/mercedes
app.get('/api/v1/mercedes', (req, res) => {
	res.json({ montadora: "Mercedes-Benz", modelo: "Actros", status: "OK", conexao: true, velocidade_media: 78 });
});

// Rota /api/v1/vw
app.get('/api/v1/vw', (req, res) => {
	res.json({ montadora: "Volkswagen", modelo: "Delivery", status: "ALERTA", conexao: false, velocidade_media: 0 });
});

// Rota /api/v1/volvo
app.get('/api/v1/volvo', (req, res) => {
	res.json({ montadora: "Volvo", modelo: "FH 540", status: "ALERTA", conexao: false, velocidade_media: 0 });
});

app.listen(PORT, () => {
	console.log(`[Binario Tech] Servidor de Telemetria rodando em http://localhost:${PORT}`);
});
