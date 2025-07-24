let todos = [];
let nextId = 1;

exports.getAll = () => todos;

exports.add = (title) => {
  const todo = { id: nextId++, title };
  todos.push(todo);
  return todo;
};

exports.remove = (id) => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) return null;
  return todos.splice(index, 1)[0];
};
