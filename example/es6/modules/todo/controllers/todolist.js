'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
	var _ngAnnotations = ngAnnotations;
	var controller = _ngAnnotations.controller;
	var inject = _ngAnnotations.inject;

	var TodoList = (function () {
		function TodoList(todoFactory, $filter) {
			_classCallCheck(this, _TodoList);

			this.statusFilter = {};
			this.newTodo = '';
			this.editedTodo = null;
			this.originalTodo = null;

			this._todoFactory = todoFactory;
			this._filter = $filter('filter');
		}

		var _TodoList = TodoList;

		_createClass(_TodoList, [{
			key: 'todos',
			get: function () {
				return this._todoFactory.todos;
			}
		}, {
			key: 'allChecked',
			get: function () {
				return this.nbRemaining === 0;
			}
		}, {
			key: 'nbRemaining',
			get: function () {
				return this._filter(this.todos, { completed: false }).length;
			}
		}, {
			key: 'setFilter',
			value: function setFilter(status) {
				switch (status) {
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
		}, {
			key: 'add',
			value: function add() {
				var title = this.newTodo.trim();
				if (!title) return;

				this._todoFactory.add(title);
				this.newTodo = '';
			}
		}, {
			key: 'edit',
			value: function edit(todo) {
				this.editedTodo = todo;
				this.originalTodo = angular.extend({}, todo);
			}
		}, {
			key: 'remove',
			value: function remove(todo) {
				this._todoFactory.remove(todo);
			}
		}, {
			key: 'doneEditing',
			value: function doneEditing(todo) {
				this.editedTodo = null;
				todo.title = todo.title.trim();
				!todo.title && this._todoFactory.remove(todo);
			}
		}, {
			key: 'statusEdited',
			value: function statusEdited() {
				this._todoFactory.update();
			}
		}, {
			key: 'revert',
			value: function revert(todo) {
				var index = this.todos.indexOf(todo);
				if (! ~index) return;

				this.todos[index] = this.originalTodo;
				this.doneEditing(this.originalTodo);
			}
		}, {
			key: 'markAll',
			value: function markAll() {
				var completed = this.allChecked;
				this.todos.forEach(function (todo) {
					return todo.completed = !completed;
				});
			}
		}]);

		TodoList = inject('todosFactory', '$filter')(TodoList) || TodoList;
		TodoList = controller('todoCtrl')(TodoList) || TodoList;
		return TodoList;
	})();

	TodoList.autodeclare('todomvc');
	//angular.module('todomvc').controller(TodoList.$name, TodoList.$component);
})();
