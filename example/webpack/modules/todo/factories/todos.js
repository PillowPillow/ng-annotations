import {factory, inject} from 'src/app';

import storage from '../services/storage';

@factory('todos')
@inject(storage)
export default class Todos {

	todos = [];

	constructor(storage) {
		this._storage = storage;
	}

	load() {
		this.todos = this._storage.get();
	}

	add(title) {
		this.todos.push({ title, completed: false });
		this.update();
	}

	update() {
		this._storage.put(this.todos);
	}

	remove(todo) {
		this.todos.splice(this.todos.indexOf(todo), 1);
		this.update();
	}

	clearCompleted() {
		this.todos = this.todos.filter(todo => !todo.completed);
		this.update();
	}

	clear() {
		this.todos = [];
		this.update();
	}

}