#!/bin/bash

# Caminho do arquivo de log do Nginx
LOG_FILE="/var/log/nginx/access.log"

# Verifica se o arquivo de log existe
if [ ! -f "$LOG_FILE" ]; then
    echo "Erro: O arquivo de log $LOG_FILE não foi encontrado."
    exit 1
fi

echo "--- Últimas requisições 200 OK no Nginx ---"

# Lê as últimas 15 linhas e filtra requisições com status HTTP 200
tail -n 15 "$LOG_FILE" | grep ' "HTTP/1.[01]" 200 '
