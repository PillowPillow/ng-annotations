(function() {
	const {controller, inject} = ngAnnotations;

	@controller('todoCtrl')
	@inject('todosFactory', '$filter')
	class TodoList {

		statusFilter = {};
		newTodo = '';
		editedTodo = null;
		originalTodo = null;

		constructor(todoFactory, $filter) {
			this._todoFactory = todoFactory;
			this._filter = $filter('filter');
		}

		get todos() {
			return this._todoFactory.todos;
		}

		get allChecked() {
			return this.nbRemaining === 0;
		}

		get nbRemaining() {
			return this._filter(this.todos, {completed: false}).length;
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

			this._todoFactory.add(title);
			this.newTodo = '';
		}

		edit(todo) {
			this.editedTodo = todo;
			this.originalTodo = angular.extend({}, todo);
		}

		remove(todo) {
			this._todoFactory.remove(todo);
		}

		doneEditing(todo) {
			this.editedTodo = null;
			todo.title = todo.title.trim();
			!todo.title && this._todoFactory.remove(todo);
		}

		statusEdited() {
			this._todoFactory.update();
		}

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
	TodoList.autodeclare('todomvc');
	//angular.module('todomvc').controller(TodoList.$name, TodoList.$component);
})()

