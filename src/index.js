import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Todo extends React.Component{
	render(){
		return(
			<li key={this.props.name}>{this.props.name}</li>
		)
	}
}

class TodoList extends React.Component{

	constructor(props){
		super(props);
		this.state={
			todolist:[
				{name:"task1",completed:false},
				{name:"task2",completed:false}
			]
		}
	}

	render(){
		let todolist=this.state.todolist;
		if(todolist.length){
			return(
				<ul>
					{todolist.map((todo)=><Todo key={todo.name} name={todo.name} />)}
				</ul>
			)
		}else{
			return(<h1>No tasks created...</h1>)
		}
	}
}


ReactDOM.render(
	<TodoList />,
	document.getElementById("root")
);