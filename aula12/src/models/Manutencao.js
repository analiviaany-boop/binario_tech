const mongoose = require('mongoose');

const itemPecaSchema = new mongoose.Schema({
  nomePeca: { 
    type: String, 
    required: [true, 'O nome da peça é obrigatório'] 
  },
  quantidade: { 
    type: Number, 
    required: [true, 'A quantidade é obrigatória'], 
    default: 1,
    min: [1, 'A quantidade mínima deve ser 1']
  },
  custoUnitario: { 
    type: Number, 
    required: [true, 'O custo unitário é obrigatório'],
    min: [0, 'O custo unitário não pode ser negativo'] // <-- Validação adicionada
  }
});

const manutencaoSchema = new mongoose.Schema({
  veiculoPlaca: { 
    type: String, 
    required: [true, 'A placa do veículo é obrigatória'], 
    uppercase: true // <-- Corrigido (o nome correto da propriedade no Mongoose é 'uppercase')
  },
  tipoManutencao: {
    type: String,
    enum: ['PREVENTIVA', 'CORRETIVA', 'EMERGENCIAL'],
    default: 'PREVENTIVA'
  },
  custoTotal: { 
    type: Number, 
    required: [true, 'O custo total é obrigatório'],
    min: [0, 'O custo total não pode ser negativo']
  },
  pecasSubstituidas: [itemPecaSchema],
  status: { 
    type: String, 
    enum: ['ABERTA', 'EM_ANDAMENTO', 'CONCLUIDA'], 
    default: 'ABERTA' 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Manutencao', manutencaoSchema);
