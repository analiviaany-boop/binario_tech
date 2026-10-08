#!/bin/bash

echo "=================================================="
echo "   MONITORAMENTO DE LOGS EM TEMPO REAL - AULA 23"
echo "=================================================="
echo "Pressione Ctrl+C para encerrar o monitoramento."
echo ""

# Exibe as últimas 20 linhas e acompanha os logs de ambos os serviços em tempo real
docker compose logs -f --tail=20 web-api redis-cache
