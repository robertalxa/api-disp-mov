const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/disp-mov');
mongoose.Promise = global.Promise;

module.exports = mongoose;