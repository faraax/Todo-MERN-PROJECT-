// const mongoose = require('mongoose');
const Todomodel = require('../model/TodoModel')

exports.getData = async (req, res) => {
    try {
        const todos = await Todomodel.find()
        res.status(201).send(todos)
        // console.log(todos)
    } catch (err) {
        res.status(400).send(err)
    }
}
exports.postData = async (req, res) => {
    const { todo } = req.body
    // res.status(200).send({ list })
    try {
        const saveData = await Todomodel.create({ todo })
        res.status(200).send({ saveData })
    } catch (err) {
        res.status(400).send(err)
    }
}
exports.deleteData = async (req, res) => {
    const id = req.params.id
    const deleteData = await Todomodel.findByIdAndDelete({ _id: id });
    try {
        res.status(200).send(deleteData)
    } catch (err) {
        res.status(400).send(err)
    }
}
exports.updateData = async (req, res) => {
    const id = req.params.id
    const todo = req.body
    const updateData = await Todomodel.findByIdAndUpdate(id, todo)
    try {
        res.status(200).send(updateData)
    } catch (err) {
        res.status(400).send(err)
    }
}
exports.deleteAllData = async (req, res) => {
    const deleteAllData = await Todomodel.deleteMany();
    try {
        res.status(201).send(deleteAllData)
    } catch (err) {
        res.status(400).send(err)
    }
}
exports.getID = async (req, res) => {
    // const todo = req.body.todo
    const findId = await Todomodel.findOne(req.body)
    try {
        res.status(201).send(findId._id)
    } catch (err) {
        res.status(400).send(findId)
    }
}

