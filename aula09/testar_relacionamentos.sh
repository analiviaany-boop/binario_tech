#!/bin/bsh
echo "===================================================="
echo " AUDITORIA DE RELACIONAMENTOS (JOIN) - BINÁRIO TECH"
echo "===================================================="


echo -e "\n[1] Cadastrando Veículo Scania..."
curl -s -X POST http://localhost:3000/api/v1/telemetria/veiculo-teste \
	-H "Content-Type: application/json" \
	-d '{"placa":"SCA-9900","montadora":"Scania","modelo":"r450"}' | jq .

echo -e "\n[2] Cadastrando Relatório Agregado (INNER JOIN)..."
curl -s http://localhost:3000/api/v1/telemetria/relatroio | jq .

