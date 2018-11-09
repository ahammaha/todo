import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Todo extends React.Component{
	render(){
		return(
			<li key={this.props.name}>
				{this.props.name} {" --- "}
				<span className="glyphicon glyphicon-remove" 
					onClick={()=>this.props.deleteTodo(this.props.name)}>
					Delete
				</span>
			</li>
		);
	}
}

class AddTodo extends React.Component{

	constructor(props){
		super(props);
		this.state={newTodoVal:this.props.newTodo}
		this.onInputChange=this.onInputChange.bind(this);
		this.addNewTodo=this.addNewTodo.bind(this);
	}

	onInputChange(e){
		let val=e.target.value;
		this.setState({newTodoVal:val});
	}

	addNewTodo(e){
		if((e.type==="keydown" && e.key==="Enter") || (e.type==="click")){
			this.props.addNewTodo(this.state.newTodoVal);
			this.setState({newTodoVal:""});
		}
	}

	render(){
		return(
			<fieldset>
				<legend>Add Todo Task</legend>
				<input type="text" 
					value={this.state.newTodoVal} 
					onKeyDown={this.addNewTodo} 
					onChange={this.onInputChange} />
				<input type="button" value="Add Todo Task" onClick={this.addNewTodo} />
			</fieldset>
		);
	}
}

class TodoList extends React.Component{
	
	constructor(props){
		super(props);
		this.deleteTodo=this.deleteTodo.bind(this);
	}

	deleteTodo(name){
		this.props.deleteTodo(name);
	}

	render(){
		let todos=this.props.todolist;
		if(todos.length){
			return(
				<ul>
					{todos.map(
						(todo)=> 
							<Todo key={todo.name} name={todo.name} deleteTodo={this.deleteTodo} />)
					}
				</ul>
			);
		}else{
			return(<h1>No tasks created...</h1>);
		}
	}
}


class TodoApp extends React.Component{
	constructor(props){
		super(props);
		this.state={
			todolist:[
				{name:"task1",completed:false},
				{name:"task2",completed:false}
			],
			newTodo:""
		}
		this.addNewTodo=this.addNewTodo.bind(this);
		this.deleteTodo=this.deleteTodo.bind(this);
	}

	addNewTodo(newTodoVal){
		let val={name:newTodoVal,completed:false}
		this.setState({todolist:[...this.state.todolist,val]});
	}

	deleteTodo(name){
		this.setState(
				(prevState)=>({todolist:prevState.todolist.filter(todo => todo.name!==name)}
			))
	}

	render(){
		return(
			<div>
				<AddTodo newTodo={this.state.newTodo} addNewTodo={this.addNewTodo} />
				<TodoList todolist={this.state.todolist} deleteTodo={this.deleteTodo} />
			</div>
		);
	}
}

ReactDOM.render(
	<TodoApp />,
	document.getElementById("root")
);