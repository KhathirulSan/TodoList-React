import { ADD_TODO, DELETE_TODO, EDIT_TODO } from '../actions/todoAction';

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case EDIT_TODO:
      const { id, editedTodo } = action.payload;
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, ...editedTodo } : todo
        ),
      };
    default:
      return state;
  }
};

export default todoReducer;