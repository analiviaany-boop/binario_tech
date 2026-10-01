#!/bin/bash

echo "=================================================="
echo "    LIMPEZA DE AMBIENTE DOCKER - BINÁRIO TECH"
echo "=================================================="

# 1. Parar e remover containers inativos (status exited, created ou dead)
INACTIVE_CONTAINERS=$(docker ps -a -q -f "status=exited" -f "status=created" -f "status=dead")

if [ -n "$INACTIVE_CONTAINERS" ]; then
    echo "[1/2] Removendo containers inativos..."
    docker rm $INACTIVE_CONTAINERS
else
    echo "[1/2] Nenhum container inativo para remover."
fi

# 2. Remover imagens pendentes/órfãs (dangling images: <none>:<none>)
DANGLING_IMAGES=$(docker images -q -f "dangling=true")

if [ -n "$DANGLING_IMAGES" ]; then
    echo "[2/2] Removendo imagens pendentes (dangling)..."
    docker rmi $DANGLING_IMAGES
else
    echo "[2/2] Nenhuma imagem pendente para remover."
fi

echo "=================================================="
echo " Limpeza concluída com sucesso!"
echo "=================================================="

