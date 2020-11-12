const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

// Retrive all data from the required table
app.get("/todos", async (req, res) => {
  try {
    const allTodo = await pool.query("SELECT * from todo");
    res.json(allTodo.rows);
  } catch (err) {
    console.error(err);
  }
});

// Show Selected data
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * from todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

// Add new data to the table
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update data to the database (description)
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo set description = $1 WHERE todo_id = $2 ",
      [description, id]
    );
    res.json("Descripton data updated!");
  } catch (err) {
    console.error(err);
  }
});
// delete specific data to the database(description)
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Description Data Deleted Successfully");
  } catch (err) {
    console.error(err);
  }
});

app.listen(5000, () => {
  console.log("running on 5000 port");
});
