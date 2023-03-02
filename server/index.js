const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//Routes CRUD

app.post('/todos', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = await pool.query("INSERT INTO todo (title, description) VALUES($1, $2) RETURNING *",
      [title, description]
    );
    res.json(newTodo.rows)
  } catch (error) {
    console.log(error.message)
  }
});

app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error.message)
  }
})

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const { description } = req.body;
    const updateTodo = await pool.query("UPDATE todo SET title = $1, description = $2 WHERE todo_id = $3",
      [title, description, id]);
    res.json("Todo was updated successfully")
  } catch (error) {
    console.log(error)
  }
})

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",
      [id])
    res.json(`Todo was deleted successfully`)
  } catch (error) {
    console.log(error)
  }
})

app.listen(4000, () => {
  console.log('Server has started on 4000')
});