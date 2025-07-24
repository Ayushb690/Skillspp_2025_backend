const express = require('express');
const todo_Routes = require('./routes/todo_Routes');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/todos', todo_Routes); // Mount the to-do routes

app.listen(port, () => {
  console.log(`To-Do server is running at http://localhost:${port}`);
});
