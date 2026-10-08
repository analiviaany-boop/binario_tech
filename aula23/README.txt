========================================================================
                        BINÁRIO TECH - AULA 23
                      Histórico de Versionamento
========================================================================

NOME: Ana Lívia Paixão
E-MAIL: pessoal - analiviaany@gmail.com
        educacional - ana.l.paixao@edu.senai.br

DESCRIÇÃO DO PROJETO: Inspecionar e filtrar respostas de APIs JSON via terminal e criar scripts em Bash (.sh) para testar rotas de telemetria automotiva (Scania, Mercedes-Benz, VW).

========================================================================

PRIMAIROS PASSOS:

1. Entrar
        - cd binario_tech
        - cd aula23

3. Estrutura de pastas (atualizado após resolução dos exercícios)
        aula23
          |
          |-> src
          |
          |-> package.json
          |
          |-> server.js
          |
          |-> Dockerfile
          |
          |-> docker-compose.yml
	  |
	  |-> status_compose.sh
	  |
	  |-> logs_unificados.sh (exercicio 2)

(Outros arquivos que vem após instalação e README.txt estão sendo ignorados nessa representação)

========================================================================

VERSIONAMENTO:

0.0.0 - package.json

{
"name": "aula23-docker-compose",
"version": "1.0.0",
"description": "Orquestração Multi-Container com Node.js e Redis - Binário Tech",
"main": "server.js",
"scripts": {
"start": "node server.js"
},
"dependencies": {
"dotenv": "^16.4.5",
"express": "^4.19.2",
"redis": "^4.6.13"
}
}

---

0.0.0 - server.js

require('dotenv').config();
const express = require('express');
const { createClient } = require('redis');

const app = express();
const PORT = process.env.PORT || 5001;
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

---

0.0.0 - .dockerignore (Este nao aparece na estrutura de arquivos pois está sendo ignorado automaticamente)

node_modules
.git
.env

---

0.0.0 - Dockerfile

FROM node:20-alpine
WORKDIR /app
COPY package\*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]

---

0.0.0 - docker-compose.yml

version: '3.8'

services:
  web-api:
    build: .
    container_name: binario_app_web
    ports:
      - "8084:5001"
    environment:
      - PORT=5001
      - REDIS_URL=redis://redis-cache:6379
    depends_on:
      - redis-cache
    networks:
      - rede-binario

  redis-cache:
    image: redis:7-alpine
    container_name: binario_redis_cache
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - rede-binario

networks:
  rede-binario:
    driver: bridge

volumes:
  redis_data:

Observação: Apos a criação de docker-compose.yml, foi necessário rodar:
	- docker compose up -d --build 
	- docker compose ps
	- curl -s http://localhost:8084/api/v1/visitas \vert{} jq . (teste)
	- curl -s http://localhost:8084/api/v1/visitas | jq . (teste)
	- docker compose restart
	- curl -s http://localhost:8084/api/v1/visitas | jq . (teste)

---

0.0.0 - status-compose.sh

#!/bin/bash
echo ""
echo "   DIAGNÓSTICO DOCKER COMPOSE - BINÁRIO TECH"
echo ""

docker compose ps

echo -e "\n--- Teste de Conectividade do Serviço Web ---"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8084/api/v1/visitas)

if [ "$HTTP_CODE" -eq 200 ]; then
  echo -e "[OK] Aplicação Web e Redis respondendo corretamente (HTTP 200)."
else
  echo -e "[ERRO] Falha ao comunicar com a pilha multi-container (HTTP Status: $HTTP_CODE)."
fi
echo "=================================================="

========================================================================

EXERCICIOS

EXERCÍCIO 1:
Adicione uma nova rota `DELETE /api/v1/visitas/reset` em `server.js` que limpe a chave `contador_visitas` no Redis e retorne confirmação em JSON.

0.0.1 - server.js

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

Comando 01: docker compose up -d --build
Comando 02: curl -X DELETE http://localhost:8084/api/v1/visitas/reset | jq .
Resposta:

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    83  100    83    0     0  10307      0 --:--:-- --:--:-- --:--:-- 10375
{
  "sucesso": true,
  "mensagem": "Contador de visitas resetado com sucesso!",
  "visitas": 0
}

EXERCÍCIO 2:
Inspecione o volume criado usando o comando `docker volume inspect aula23_redis_data` e identifique o caminho de montagem no sistema de arquivos do Linux host.

Comando: docker volume inspect aula23_redis_data
Resposta: 
[
    {
        "CreatedAt": "2026-10-08T18:40:00Z",
        "Driver": "local",
        "Labels": {
            "com.docker.compose.project": "aula23",
            "com.docker.compose.version": "2.x.x",
            "com.docker.compose.volume": "redis_data"
        },
        "Mountpoint": "/var/lib/docker/volumes/aula23_redis_data/_data",
        "Name": "aula23_redis_data",
        "Options": null,
        "Scope": "local"
    }
]

EXERCÍCIO 3:
Crie um script Bash `logs_unificados.sh` que utilize o comando `docker compose logs -f --tail=20` para monitorar os logs combinados da API e do Redis em tempo real.

0.0.0 - logs_unificados.sh

#!/bin/bash

echo "=================================================="
echo "   MONITORAMENTO DE LOGS EM TEMPO REAL - AULA 23"
echo "=================================================="
echo "Pressione Ctrl+C para encerrar o monitoramento."
echo ""

# Exibe as últimas 20 linhas e acompanha os logs de ambos os serviços em tempo real
docker compose logs -f --tail=20 web-api redis-cache

Comando 01: chmod +x logs_unificados.sh
Comando 02: ./logs_unificados.sh 

EXERCÍCIO 4:
Versione e envie todas as alterações da `aula23` para a branch `main` do GitHub utilizando os comandos `git add`, `git commit` e `git push origin main`.

Comando 01: git add .
Comando 02: git commit -m "A descricao do commit"
Comando 03: git push origin main
