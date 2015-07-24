'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
	var _ngAnnotations = ngAnnotations;
	var directive = _ngAnnotations.directive;

	var TodoList = (function () {
		function TodoList() {
			_classCallCheck(this, _TodoList);

			this.restrict = 'EA';
			this.scope = {};
			this.controller = 'todoCtrl';
			this.controllerAs = 'TodoList';
			this.templateUrl = 'todolist.tpl';
		}

		var _TodoList = TodoList;
		TodoList = directive('todoList')(TodoList) || TodoList;
		return TodoList;
	})();

	TodoList.autodeclare('todomvc');
})();
