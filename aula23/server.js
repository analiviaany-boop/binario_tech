require('dotenv').config();
const express = require('express');
const { createClient } = require('redis');

const app = express();
const PORT = process.env.PORT || 5000;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

app.use(express.json());

const client = createClient({ url: REDIS_URL });

client.on('error', (err) => console.error('\[Erro Redis\]', err));

async function init() {
await client.connect();
console.log('\[Binário Tech\] Conectado ao servidor Redis com sucesso!');
}

init();

// Rota com contador de acessos via Redis
app.get('/api/v1/visitas', async (req, res) => {
try {
const visitas = await client.incr('contador_visitas');
res.json({
status: "SUCESSO",
mensagem: "Contador atualizado no Redis com sucesso!",
totalVisitas: visitas,
instanciaHost: require('os').hostname(),
timestamp: new Date()
});
} catch (error) {
res.status(500).json({ status: "ERRO", mensagem: error.message });
}
});

app.listen(PORT, () => {
console.log(`[Binário Tech] API Orquestrada rodando na porta ${PORT}`);
});

// Rota para resetar o contador de visitas
app.delete('/api/v1/visitas/reset', async (req, res) => {
  try {
    // Apaga a chave do contador no Redis
    await client.del('contador_visitas');

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Contador de visitas resetado com sucesso!',
      visitas: 0
    });
  } catch (error) {
    console.error('Erro ao resetar contador no Redis:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno ao resetar o contador'
    });
  }
});




