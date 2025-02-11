import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
  car_id: {
    type: String,
    required: true
  },
  data_hora_criacao: {
    type: Date,
    required: true,
    get: (date: Date) => date.toLocaleString('pt-BR')
  },
  data_hora_processamento: {
    type: Date,
    required: true,
    get: (date: Date) => date.toLocaleString('pt-BR')
  }
}, {
  toJSON: { getters: true },
  toObject: { getters: true }
});

export const Log = mongoose.model('Log', LogSchema);