var mongoose = require('mongoose');
var config = require('./config_file');

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

module.exports = mongoose;
