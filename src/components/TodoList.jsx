import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "../redux/actions/todoAction";
import { BsPencilSquare, BsFillTrash3Fill } from "react-icons/bs";

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoReducer.todos);
  const [addTodoInput, setAddTodoInput] = useState("");
  const [editTodoInput, setEditTodoInput] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleAddSubmit = (e) => {
    e.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: addTodoInput,
      isDone: false,
    };
    dispatch(addTodo(newTodo));

    setAddTodoInput("");
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    dispatch(editTodo(editTodoId, { title: editTodoInput }));
    setEditTodoId(null);
    setEditTodoInput("");
  };

  const handleEdit = (id, title) => {
    setEditTodoId(id);
    setEditTodoInput(title);
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleComplete = (id, isDone) => {
    dispatch(editTodo(id, { isDone: !isDone }));
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  let filteredTodos = todos;
  if (filter === "active") {
    filteredTodos = todos.filter((todo) => !todo.isDone);
  } else if (filter === "complete") {
    filteredTodos = todos.filter((todo) => todo.isDone);
  }

  return (
    <>
      <div className="container">
        <div className="form-container">
          <h1>Rencanakan Kegiatan Anda Hari Ini!</h1>
          <form onSubmit={handleAddSubmit}>
            <input
              type="text"
              placeholder="Masukkan Kegiatan Anda ..."
              value={addTodoInput}
              onChange={(e) => setAddTodoInput(e.target.value)}
              required
            />
            <button className="btn-submit">Add</button>
          </form>

          <div className="filter-container">
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => handleFilterChange("all")}
            >
              View All
            </button>
            <button
              className={`filter-btn ${filter === "active" ? "active" : ""}`}
              onClick={() => handleFilterChange("active")}
            >
              Active
            </button>
            <button
              className={`filter-btn ${filter === "complete" ? "active" : ""}`}
              onClick={() => handleFilterChange("complete")}
            >
              Completed
            </button>
          </div>

          <div className="form-wrapperr">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((item) => (
                <div key={item.id} className="data-wrap">
                  <input
                    type="checkbox"
                    checked={item.isDone}
                    id="check5"
                    className="check"
                    onChange={() => handleComplete(item.id, item.isDone)}
                  />

                  {editTodoId === item.id ? (
                    <form onSubmit={handleEditSubmit} className="form-edit">
                      <input
                        type="text"
                        placeholder="Edit Todo Anda"
                        value={editTodoInput}
                        onChange={(e) => setEditTodoInput(e.target.value)}
                        required
                      />
                      <button className="btn-save">Simpan</button>
                    </form>
                  ) : (
                    <>
                      <span
                        style={{
                          textDecoration: item.isDone ? "line-through" : "none",
                        }}
                      >
                        {item.title}
                      </span>

                      <div className="btn-wrapper">
                        {!item.isDone && (
                          <BsPencilSquare
                            onClick={() => handleEdit(item.id, item.title)}
                            className="btn-edit"
                          ></BsPencilSquare>
                        )}
                        {!item.isDone && (
                          <BsFillTrash3Fill
                            onClick={() => handleDelete(item.id)}
                            className="btn-delete"
                          ></BsFillTrash3Fill>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>Kegiatan Anda Kosong!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;
