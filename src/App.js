import React, { useState } from "react";

function App() {
  const [todoMetin, setTodoMetin] = useState("");
  const [todolar, setTodolar] = useState([]);
  const [editButonunaBasildiMi, setEditButonunaBasildiMi] = useState(false);
  const [guncellenecekMetin, setGuncellenecekMetin] = useState("");
  const [guncellenecekTodo, setGuncellenecekTodo] = useState(null);

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
    setEditButonunaBasildiMi(false);
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
  const todoGuncelle = (event) => {
    event.preventDefault();
    if (guncellenecekMetin === "") {
      alert("Metin kutusu boş bırakılamaz.");
      return;
    }
    let tempTodos = [];
    todolar.map((item) => {
      if (item.id === guncellenecekTodo.id) {
        let updateTodo = {
          ...guncellenecekTodo,
          title: guncellenecekMetin,
        };
        tempTodos.push(updateTodo);
      } else {
        tempTodos.push(item);
      }
    });
    setTodolar(tempTodos);
    setEditButonunaBasildiMi(false);
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
      <div className="position-relative">
        <div
          className="border border-secondary rounded-3 position-static"
          style={{ height: 40 }}>
          {editButonunaBasildiMi === true && (
            <form onSubmit={todoGuncelle}>
              <div className="input-group mb-3">
                <input
                  value={guncellenecekMetin}
                  onChange={(event) =>
                    setGuncellenecekMetin(event.target.value)
                  }
                  className="form-control"
                  type="text"
                />
                <button
                  onClick={() => {
                    setEditButonunaBasildiMi(false);
                  }}
                  className="btn btn-danger w-25"
                  type="button"
                  id="button-addon2">
                  Cancel
                </button>
                <button
                  className="btn btn-info w-25"
                  type="submit"
                  id="button-addon2">
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="container position-absolute " style={{ top: 160 }}>
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
                  <small>{new Date(item.date).toLocaleString()}</small>
                </div>
                <div>
                  <button
                    onClick={() => {
                      deleteTodo(item.id);
                      setEditButonunaBasildiMi(false);
                    }}
                    className="btn btn-sm btn-danger">
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      if (editButonunaBasildiMi === false) {
                        setEditButonunaBasildiMi(true);
                      } else {
                        setEditButonunaBasildiMi(false);
                      }
                      setGuncellenecekMetin(item.title);
                      setGuncellenecekTodo(item);
                    }}
                    className="btn btn-sm btn-secondary">
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      changeHasDone(item);
                      setEditButonunaBasildiMi(false);
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
