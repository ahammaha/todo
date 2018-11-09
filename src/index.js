import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Todo extends React.Component{
	render(){
		return(
			<tr>
				<td>
					<button className="btn btn-circle" onClick={()=>this.props.changeStatus(this.props.id)} >
						<i className={this.props.completed?"green-color glyphicon glyphicon-ok":""} >
						</i>
					</button>
					<span className={this.props.completed?"grey-text todoname-min-width":"todoname-min-width"}>
						{this.props.name}
					</span>
					<span className="glyphicon glyphicon-trash red-color" 
						onClick={()=>this.props.deleteTodo(this.props.id)}>
					</span>
				</td>
			</tr>
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
			<fieldset className="align-center form-group">
				<legend>Add Todo Task</legend>
				<input type="text" 
					className="form-control"
					placeholder="Press enter to add Todo"
					value={this.state.newTodoVal} 
					onKeyDown={this.addNewTodo} 
					onChange={this.onInputChange} />
				<button className="btn btn-primary" onClick={this.addNewTodo}>Add Todo Task</button>
			</fieldset>
		);
	}
}

class TodoList extends React.Component{
	
	constructor(props){
		super(props);
		this.deleteTodo=this.deleteTodo.bind(this);
		this.changeStatus=this.changeStatus.bind(this);
	}

	deleteTodo(id){
		this.props.deleteTodo(id);
	}

	changeStatus(id){
		this.props.changeStatus(id);
	}

	render(){
		let todos=this.props.todolist;
		if(todos.length){
			return(
				<div className="">
					<table id="todolist">
						<tbody>
							{
								todos.map(
									(todo)=> <Todo 
										key={todo.id}  
										id={todo.id} 
										name={todo.name} 
										completed={todo.completed}
										changeStatus={this.changeStatus}
										deleteTodo={this.deleteTodo} />
								)
							}
						</tbody>
					</table>
				</div>
			);
		}else{
			return(<div className="align-center"><h3>No tasks created...</h3></div>);
		}
	}
}


class TodoApp extends React.Component{
	constructor(props){
		super(props);
		this.state={
			todolist:[],
			newTodo:"",
			idGen:1
		};
		this.addNewTodo=this.addNewTodo.bind(this);
		this.deleteTodo=this.deleteTodo.bind(this);
		this.changeStatus=this.changeStatus.bind(this);
	}

	addNewTodo(newTodoVal){
		this.setState((prevState)=>({idGen:prevState.idGen+1}));
		let val={id:this.state.idGen ,name:newTodoVal,completed:false};
		this.setState({todolist:[...this.state.todolist,val]});
	}

	deleteTodo(id){
		this.setState(
				prevState=>({todolist:prevState.todolist.filter(todo => todo.id!==id)})
			);
	}

	changeStatus(id){
		this.setState(
			prevState=>({
				todolist:prevState.todolist.map(
					todo => (todo.id===id ? Object.assign(todo,{completed:!todo.completed}) : todo)
				)
			})
		);
	}

	render(){
		return(
			<div>
				<AddTodo newTodo={this.state.newTodo} addNewTodo={this.addNewTodo} />
				<TodoList 
					todolist={this.state.todolist} 
					changeStatus={this.changeStatus}
					deleteTodo={this.deleteTodo} />
			</div>
		);
	}
}

ReactDOM.render(
	<TodoApp />,
	document.getElementById("root")
);