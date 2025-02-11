import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  marca: {
    type: String,
    required: true
  },
  preco: {
    type: Number,
    required: true
  },
  anoFabricacao: {
    type: Number,
    required: true
  },
  ativo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export const CarModel = mongoose.model('Car', carSchema);