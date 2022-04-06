import { useState, useEffect } from "react";

function TodoList() {
  // crear estado

  const [equipo, setEquipo] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // Obtener base de datos y agregarla al estado

  const getData = async () => {
    const data = await fetch(
      "https://624b74fa44505084bc5189ef.mockapi.io/to-do"
    );
    const data2 = await data.json().catch((error) => {
      console.log(error);
    });
    console.log(data2);
    setEquipo(data2);
  };

  // Agregar un to-do

  async function addToDo() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: document.getElementById("nuevo-to-do").value,
      }),
    };
    await fetch(
      "https://624b74fa44505084bc5189ef.mockapi.io/to-do",
      requestOptions
    );

    await getData();
  }

  //Remove

  async function remove(id) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(
      `https://624b74fa44505084bc5189ef.mockapi.io/to-do/${id}`,
      requestOptions
    );
    await getData();
  }

  //Tarea Terminada

  async function done(id) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: true }),
    };
    await fetch(
      `https://624b74fa44505084bc5189ef.mockapi.io/to-do/${id}`,
      requestOptions
    );

    await getData();
  }

  //Render

  return (
    <section id="todoList">
      <div id="add-todo">
        <input
          id="nuevo-to-do"
          type="text"
          placeholder="Write a To-Do here"
          name="to-do"
        ></input>
        <button onClick={addToDo} id="addToDoButton">
          Add To-Do
        </button>
      </div>

      <h1>To-Do List</h1>

      <ul id="list-todo">
        {equipo
          .filter((bol) => !bol.status)
          .map((item) => (
            <li key={item.id} className="todo-items">
              <p className="text-todo">{item.title} </p>
              <button onClick={() => done(item.id)} className="done">
                Done!
              </button>
              <button onClick={() => remove(item.id)} className="remove">
                Remove
              </button>
            </li>
          ))}
      </ul>

      <h2>Already Done List</h2>
      <ul id="done-list">
        {equipo
          .filter((bol) => bol.status)
          .map((item) => (
            <li key={item.id} className="done-items">
              <p className="text-todo-done">{item.title}</p>
              <button onClick={() => remove(item.id)} className="remove">
                Remove
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
}
export default TodoList;
