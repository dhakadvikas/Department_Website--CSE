const mongoose = require('mongoose');

const trSchema = new mongoose.Schema(
  {
    sem_1: {type: Number, defaultValue:0},
    sem_2: {type: Number, defaultValue:0},
    sem_3: {type: Number, defaultValue:0},
    sem_4: {type: Number, defaultValue:0},
    sem_5: {type: Number, defaultValue:0},
    sem_6: {type: Number, defaultValue:0},
    sem_7: {type: Number, defaultValue:0},
    sem_8: {type: Number, defaultValue:0},
    enrollNo:{type: String ,required: true, unique: true},
    name: {type: String, required: true},
    year: {type: Number, required: true},
    detend : {type: Boolean, default: false}

  }
);

const trSheet = mongoose.model('TrData', trSchema);

module.exports = trSheet;
