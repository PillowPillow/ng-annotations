import {controller, inject, attach, conceal} from 'lib/app';

import todos from '../factories/todos';

@controller()
@inject('$filter', todos)
export default class TodoList {

	statusFilter = {};
	newTodo = '';
	editedTodo = null;
	originalTodo = null;

	@attach(todos)
	@conceal
	todoFactory;

	@conceal
	filter;

	@attach(todos, 'todos')
	todos;

	constructor($filter) {
		this.filter = $filter('filter');
	}

	get allChecked() {
		return this.nbRemaining === 0;
	}

	get nbRemaining() {
		return this.filter(this.todos, {completed: false}).length;
	}

	setFilter(status) {
		switch(status) {
			case 'active':
				this.statusFilter = { completed: false };
				break;
			case 'completed':
				this.statusFilter = { completed: true };
				break;
			default:
				this.statusFilter = {};
				break;
		}
	}

	add() {
	console.log('passage')
		var title = this.newTodo.trim();
		if(!title) return;

		this.todoFactory.add(title);
		this.newTodo = '';
	}

	edit(todo) {
		this.editedTodo = todo;
		this.originalTodo = angular.extend({}, todo);
	}

	@attach(todos, 'remove')
	remove;

	doneEditing(todo) {
		this.editedTodo = null;
		todo.title = todo.title.trim();
		!todo.title && this.todoFactory.remove(todo);
	}

	@attach(todos, 'update')
	statusEdited;

	revert(todo) {
		let index = this.todos.indexOf(todo);
		if(!~index) return;

		this.todos[index] = this.originalTodo;
		this.doneEditing(this.originalTodo);
	}

	markAll() {
		let completed = this.allChecked;
		this.todos.forEach(todo => todo.completed = !completed);
	};

}