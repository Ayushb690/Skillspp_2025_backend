const todo_Model = require('../models/todo_Model');

exports.getTodos = (req, res) => {
  res.status(200).json(todo_Model.getAll());
};

exports.createTodo = (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTodo = todo_Model.add(title);
  res.status(201).json(newTodo);
};

exports.deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const deletedTodo = todo_Model.remove(id);

  if (!deletedTodo) {
    return res.status(404).json({ error: 'To-do item not found' });
  }

  res.status(200).json({ message: 'Item Deleted successfully', item: deletedTodo });
};
