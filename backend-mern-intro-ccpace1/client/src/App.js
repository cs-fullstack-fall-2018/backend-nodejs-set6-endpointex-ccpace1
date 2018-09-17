import React, { Component } from 'react';
import './App.css';
import ToDoList from "./ToDoList";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []}
    }

    deleteByID(id){
        fetch('/api/todo',
            {
                method: "DELETE",
                body: JSON.stringify({"id": id}),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(data => data.json());
    };
    render() {
      fetch('api/todos/testuser')
          .then(data => data.json())
        .then(response => this.setState({data: response}));
    return (
        <div className="App">
            <ToDoList arr={this.state.data} deleteFunction={this.deleteByID}/>

            <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
        </div>
    );
    }
}
export default App;
