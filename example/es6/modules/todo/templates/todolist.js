'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
	var _ngAnnotations = ngAnnotations;
	var run = _ngAnnotations.run;
	var inject = _ngAnnotations.inject;

	var TemplateRun = (function () {
		function TemplateRun($templateCache) {
			_classCallCheck(this, _TemplateRun);

			$templateCache.put('todolist.tpl', '<section class="todoapp">\n\t\t\t\t  <header class="header">\n\t\t\t\t    <h1>Todos</h1>\n\t\t\t\t    <form ng-submit="TodoList.add()" class="todo-form">\n\t\t\t\t      <input placeholder="What needs to be done?" ng-model="TodoList.newTodo" autofocus="autofocus" class="new-todo"/>\n\t\t\t\t    </form>\n\t\t\t\t  </header>\n\t\t\t\t  <section ng-show="TodoList.todos.length &gt; 0" ng-cloak="ng-cloak" class="main">\n\t\t\t\t    <input type="checkbox" ng-checked="TodoList.allChecked" ng-click="TodoList.markAll()" class="toggle-all"/>\n\t\t\t\t    <label for="toggle-all">Mark all as complete</label>\n\t\t\t\t    <ul class="todo-list">\n\t\t\t\t      <li ng-repeat="todo in TodoList.todos | filter:TodoList.statusFilter track by $index" ng-class="{completed: todo.completed, editing: todo === TodoList.editedTodo}">\n\t\t\t\t        <div class="view">\n\t\t\t\t          <input type="checkbox" ng-model="todo.completed" ng-change="TodoList.statusEdited()" class="toggle"/>\n\t\t\t\t          <label ng-dblclick="TodoList.edit(todo)">{{todo.title}}</label>\n\t\t\t\t          <button ng-click="TodoList.remove(todo)" class="destroy"></button>\n\t\t\t\t        </div>\n\t\t\t\t        <form ng-submit="TodoList.doneEditing(todo)">\n\t\t\t\t          <input ng-trim="false" ng-model="todo.title" ng-blur="TodoList.doneEditing(todo)" todo-escape="TodoList.revert(todo)" todo-focus="todo === TodoList.editedTodo" class="edit"/>\n\t\t\t\t        </form>\n\t\t\t\t      </li>\n\t\t\t\t    </ul>\n\t\t\t\t  </section>\n\t\t\t\t  <footer ng-show="TodoList.todos.length &gt; 0" ng-cloak="ng-cloak" class="footer"><span class="todo-count"><strong>{{TodoList.nbRemaining}}&nbsp;</strong>\n\t\t\t\t      <ng-pluralize count="TodoList.nbRemaining" when="{ one: \'item left\', other: \'items left\' }"></ng-pluralize></span>\n\t\t\t\t    <ul class="filters">\n\t\t\t\t      <li><a ng-click="TodoList.setFilter(\'none\')" ng-class="{selected: TodoList.statusFilter.completed === undefined}">All</a></li>\n\t\t\t\t      <li><a ng-click="TodoList.setFilter(\'active\')" ng-class="{selected: TodoList.statusFilter.completed === false}">Active</a></li>\n\t\t\t\t      <li><a ng-click="TodoList.setFilter(\'completed\')" ng-class="{selected: TodoList.statusFilter.completed === true}">Completed</a></li>\n\t\t\t\t    </ul>\n\t\t\t\t    <button id="clear-completed" ng-click="TodoList.clearCompletedTodos()" ng-show="TodoList.remainingCount &lt; TodoList.todos.length">Clear completed</button>\n\t\t\t\t  </footer>\n\t\t\t\t</section>');
		}

		var _TemplateRun = TemplateRun;
		TemplateRun = inject('$templateCache')(TemplateRun) || TemplateRun;
		TemplateRun = run()(TemplateRun) || TemplateRun;
		return TemplateRun;
	})();

	TemplateRun.autodeclare('todomvc');
})();
