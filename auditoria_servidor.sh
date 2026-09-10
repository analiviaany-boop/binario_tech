echo "===================================="
echo "AUDITORIA DE SERVIDOR - BINARIO TECH"
echo "===================================="

echo "Listando os processos de Node.js ativos no servidor para o arquivo..."
ps aux | grep node >> ./processos.log

echo "Confira o arquivo 'processo.log' com o cat..."
cat processos.log
