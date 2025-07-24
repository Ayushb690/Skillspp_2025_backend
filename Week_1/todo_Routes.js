const express = require('express');
const router = express.Router();
const todo_Controller = require('../controllers/todo_Controller');

router.get('/', todo_Controller.getTodos);
router.post('/', todo_Controller.createTodo);
router.delete('/:id', todo_Controller.deleteTodo);

module.exports = router;
