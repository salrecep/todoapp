import React, { useState } from "react";

function App() {
  const [todoMetin, setTodoMetin] = useState("");
  const [todolar, setTodolar] = useState([]);

  const formuKontrolEt = (event) => {
    event.preventDefault();
    if (todoMetin === "") {
      alert("Bu alan boş bırakılamaz");
      return;
    }
    console.log(todoMetin);
    const newTodo = {
      id: new Date().getTime(),
      title: todoMetin,
      date: new Date(),
      yapildiMi: false,
    };
    console.log(newTodo);

    setTodolar([newTodo, ...todolar]);
    setTodoMetin("");
  };

  const deleteTodo = (sil) => {
    const filtrele = todolar.filter((i) => i.id !== sil);
    setTodolar(filtrele);
  };

  const changeHasDone = (todo) => {
    let tempTodos = [];
    for (let i = 0; i < todolar.length; i++) {
      if (todolar[i].id === todo.id) {
        let updatedTodo = {
          ...todo,
          yapildiMi: !todo.yapildiMi,
        };
        tempTodos.push(updatedTodo);
      } else {
        tempTodos.push(todolar[i]);
      }
    }
    setTodolar(tempTodos);
  };

  return (
    <div className="container my-5">
      <form onSubmit={formuKontrolEt}>
        <div className="input-group mb-3">
          <input
            value={todoMetin}
            onChange={(event) => {
              setTodoMetin(event.target.value);
            }}
            type="text"
            className="form-control"
            placeholder="Type your todo"
          />
          <button
            className="btn btn-primary w-25"
            type="submit"
            id="button-addon2">
            ADD
          </button>
        </div>
      </form>
      <div className="container">
        {todolar.length === 0 ? (
          <p className="text-center">No work found yet.</p>
        ) : (
          <div>
            {todolar.map((item, index) => (
              <div
                key={index}
                style={{ borderBottom: "1px solid gray" }}
                className="d-flex justify-content-between align-items-center">
                <div>
                  <h1
                    style={{
                      textDecoration:
                        item.yapildiMi === true ? "line-through" : "none",
                    }}>
                    {item.title}{" "}
                  </h1>
                  <small>{new Date(item.date).toLocaleDateString()}</small>
                </div>
                <div>
                  <button
                    onClick={() => {
                      deleteTodo(item.id);
                    }}
                    className="btn btn-sm btn-danger">
                    Delete
                  </button>
                  <button className="btn btn-sm btn-secondary">Edit</button>
                  <button
                    onClick={() => {
                      changeHasDone(item);
                    }}
                    className="btn btn-sm btn-success">
                    {item.yapildiMi === false ? "Done" : "Undone"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
