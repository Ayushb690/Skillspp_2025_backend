import dotenv from "dotenv"

dotenv.config()

import express from 'express';
import mongoose from 'mongoose';
import Todo from './models/Todo.js';

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');

    const sampleTodo = new Todo({ title: 'Test Todo' });

    sampleTodo.save()
        .then(() => console.log('Sample todo added to DB.'))
        .catch(err => console.error('Error adding sample todo:', err));
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
    res.send('Server is running and MongoDB is connected.');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
