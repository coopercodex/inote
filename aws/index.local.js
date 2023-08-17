'use strict'
let ApiBuilder = require('claudia-api-builder');
const AWS = require('aws-sdk');
const Pool = require('pg').Pool;
const express = require('express')
const app = require('./index')



// app.use(cors());
app.use(express.json());


// var api = new ApiBuilder();
const port = process.env.PORT || 4000

const pool = new Pool({
  ssl: { sslmode: 'require', rejectUnauthorized: false }
})



app.post('/api/todos', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = await pool.query("INSERT INTO todo (title, description) VALUES($1, $2) RETURNING *",
      [title, description]
    );
    res.json(newTodo.rows[0])
  } catch (error) {
    console.log(error.message)
  }
});

app.get('/api/todos', async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo ORDER BY id DESC");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.get('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error.message)
  }
})

app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const { description } = req.body;
    const updateTodo = await pool.query("UPDATE todo SET title = $1, description = $2 WHERE id = $3",
      [title, description, id]);
    res.json("Todo was updated successfully")
  } catch (error) {
    console.log(error)
  }
})

app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1",
      [id])
    res.json(`Todo was deleted successfully`)
  } catch (error) {
    console.log(error)
  }
})


app.listen(port, () => 
  console.log(`Server is listening on port ${port}.`)
)

module.exports = app;