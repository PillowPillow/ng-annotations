'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
	var _ngAnnotations = ngAnnotations;
	var run = _ngAnnotations.run;
	var inject = _ngAnnotations.inject;

	var TodoRun = (function () {
		function TodoRun(todoFactory) {
			_classCallCheck(this, _TodoRun);

			this._todoFactory = todoFactory;
			this.loadTodos();
		}

		_createClass(TodoRun, [{
			key: 'loadTodos',
			value: function loadTodos() {
				this._todoFactory.load();
			}
		}]);

		var _TodoRun = TodoRun;
		TodoRun = inject('todosFactory')(TodoRun) || TodoRun;
		TodoRun = run()(TodoRun) || TodoRun;
		return TodoRun;
	})();

	TodoRun.declare('todomvc');
})();
