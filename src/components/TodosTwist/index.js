import { Component } from "react";
import { v4 } from "uuid";
import Cookies from "js-cookie";
import TodoItem from "../TodoItem";

import "./index.css";

class TodosTwist extends Component {
  state = {
    todosList: [],
    textValue: "",
  };

  componentDidMount() {
    this.getTodosList();
  }

  getTodosList = () => {
    const todos = Cookies.get("todosList");
    console.log(todos);
    const parsedTodos = JSON.parse(todos);
    this.setState({ todosList: parsedTodos });
  };

  inputText = (event) => {
    this.setState({ textValue: event.target.value });
  };

  saveTodoTwists = () => {
    const { todosList } = this.state;
    const values = JSON.stringify(todosList);

    Cookies.set("todosList", values, { expires: 30 });
  };

  addGoalText = () => {
    const { textValue } = this.state;
    const lenValue = textValue.length;
    const times = textValue[lenValue - 1];
    let i = 1;
    while (i <= times) {
      const newGoal = {
        id: v4(),
        title: textValue.slice(0, lenValue - 1),
        editState: false,
        count: 0,
      };
      this.setState((prevState) => ({
        todosList: [...prevState.todosList, newGoal],
        textValue: "",
      }));
      i += 1;
    }
  };

  editTodo = (id) => {
    this.setState((prevState) => ({
      todosList: [
        ...prevState.todosList.map((eachTodo) => {
          if (eachTodo.id === id) {
            return { ...eachTodo, editState: true };
          }
          return eachTodo;
        }),
      ],
    }));
  };

  changeText = (event, id) => {
    this.setState((prevState) => ({
      todosList: [
        ...prevState.todosList.map((eachTodo) => {
          if (eachTodo.id === id) {
            return { ...eachTodo, title: event.target.value };
          }
          return eachTodo;
        }),
      ],
    }));
  };

  saveTodo = (id) => {
    this.setState((prevState) => ({
      todosList: [
        ...prevState.todosList.map((eachTodo) => {
          if (eachTodo.id === id) {
            return {
              ...eachTodo,
              editState: false,
              count: eachTodo.count + 1,
            };
          }
          return eachTodo;
        }),
      ],
    }));
  };

  deleteTodo = (id) => {
    const { todosList } = this.state;
    const updatedTodosList = todosList.filter((eachTodo) => eachTodo.id !== id);
    this.setState({ todosList: updatedTodosList });
  };

  render() {
    const { todosList, textValue } = this.state;

    return (
      <div className="simple-todos-container">
        <h1 className="heading">Day Goals!</h1>
        <div className="todos-container">
          <input
            type="text"
            placeholder="Write code 3"
            value={textValue}
            onChange={this.inputText}
            className="input-text"
          />
          <button
            type="button"
            onClick={this.addGoalText}
            className="add-button"
          >
            Add Todo
          </button>
          <ul className="todos-list">
            {todosList.map((eachTodo) => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteTodo={this.deleteTodo}
                editTodo={this.editTodo}
                saveTodo={this.saveTodo}
                changeText={this.changeText}
              />
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="save-button"
          onClick={this.saveTodoTwists}
        >
          Save
        </button>
      </div>
    );
  }
}
export default TodosTwist;
