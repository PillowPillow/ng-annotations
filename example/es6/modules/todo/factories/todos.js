'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
	var _ngAnnotations = ngAnnotations;
	var factory = _ngAnnotations.factory;
	var inject = _ngAnnotations.inject;

	var Todos = (function () {
		function Todos(storage) {
			_classCallCheck(this, _Todos);

			this.todos = [];

			this._storage = storage;
		}

		_createClass(Todos, [{
			key: 'load',
			value: function load() {
				this.todos = this._storage.get();
			}
		}, {
			key: 'add',
			value: function add(title) {
				this.todos.push({ title: title, completed: false });
				this.update();
			}
		}, {
			key: 'update',
			value: function update() {
				this._storage.put(this.todos);
			}
		}, {
			key: 'remove',
			value: function remove(todo) {
				this.todos.splice(this.todos.indexOf(todo), 1);
				this.update();
			}
		}, {
			key: 'clearCompleted',
			value: function clearCompleted() {
				this.todos = this.todos.filter(function (todo) {
					return !todo.completed;
				});
				this.update();
			}
		}, {
			key: 'clear',
			value: function clear() {
				this.todos = [];
				this.update();
			}
		}]);

		var _Todos = Todos;
		Todos = inject('todoStorage')(Todos) || Todos;
		Todos = factory('todosFactory')(Todos) || Todos;
		return Todos;
	})();

	Todos.declare('todomvc');
})();
