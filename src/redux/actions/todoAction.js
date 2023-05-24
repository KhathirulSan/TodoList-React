export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const EDIT_TODO = "EDIT_TODO";

export const addTodo = (newTodo) => {
  return {
    type: ADD_TODO,
    payload: newTodo,
  };
};

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: id,
  };
};

export const editTodo = (id, editedTodo) => {
  return {
    type: EDIT_TODO,
    payload: {
      id,
      editedTodo,
    },
  };
};

