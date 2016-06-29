import {component, inject, attach, conceal} from 'src/app';

import todos from '../factories/todos';
import tplRenderer from '../templates/todolist.jade';

const $log = '$log';//service decorated by our log decorator

@component({
	selector: 'todoList',
	alias: 'TodoList',
	template: tplRenderer()
})
@inject('$filter', $log, todos)
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

	constructor($filter, logger) {
		this.filter = $filter('filter');
		logger.special('component initialized');
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