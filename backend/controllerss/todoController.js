
const Todo =require("../models/todoModel");


const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const addTodo = async (req, res) => {
  try {
    const newTodo = new Todo({ text: req.body.text });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "To-Do item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getTodos, addTodo, deleteTodo };
