import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const TODOLIST=[
				{name:"task1",completed:false},
				{name:"task2",completed:false},
				{name:"task3",completed:false}
			]

class Todo extends React.Component{
	render(){
		return(
			<li key={this.props.name}>{this.props.name}</li>
		)
	}
}

class TodoList extends React.Component{
	render(){
		const todos=this.props.todolist;
		
		return(
			<ul>		
				{/* {{todos.map((todo)=> <li key={todo.id}>{todo.name} - {todo.completed.toString()}</li>)} */}
				
				{todos.map((todo)=> <Todo key={todo.name} name={todo.name} />)}

			</ul>
		);
	}
}



ReactDOM.render(
	<TodoList todolist={TODOLIST} />,
	document.getElementById("root")
);