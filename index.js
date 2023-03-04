const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}
//Routes CRUD
// console.log(__dirname)
// console.log(path.join(__dirname, "client/build"))

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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"))
})

app.listen(PORT, () => {
  console.log('Server has started on 4000')
});