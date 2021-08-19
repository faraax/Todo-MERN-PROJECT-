const mongoose = require('mongoose');

const todomodel = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
    }
});

const Todomodel = mongoose.model('Todo', todomodel);
module.exports = Todomodel;