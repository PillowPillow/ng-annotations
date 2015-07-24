(function() {
	const {run, inject} = ngAnnotations;

	@run()
	@inject('$templateCache')
	class TemplateRun {

		constructor($templateCache) {
			$templateCache.put('todolist.tpl',
				`<section class="todoapp">
				  <header class="header">
				    <h1>Todos</h1>
				    <form ng-submit="TodoList.add()" class="todo-form">
				      <input placeholder="What needs to be done?" ng-model="TodoList.newTodo" autofocus="autofocus" class="new-todo"/>
				    </form>
				  </header>
				  <section ng-show="TodoList.todos.length &gt; 0" ng-cloak="ng-cloak" class="main">
				    <input type="checkbox" ng-checked="TodoList.allChecked" ng-click="TodoList.markAll()" class="toggle-all"/>
				    <label for="toggle-all">Mark all as complete</label>
				    <ul class="todo-list">
				      <li ng-repeat="todo in TodoList.todos | filter:TodoList.statusFilter track by $index" ng-class="{completed: todo.completed, editing: todo === TodoList.editedTodo}">
				        <div class="view">
				          <input type="checkbox" ng-model="todo.completed" ng-change="TodoList.statusEdited()" class="toggle"/>
				          <label ng-dblclick="TodoList.edit(todo)">{{todo.title}}</label>
				          <button ng-click="TodoList.remove(todo)" class="destroy"></button>
				        </div>
				        <form ng-submit="TodoList.doneEditing(todo)">
				          <input ng-trim="false" ng-model="todo.title" ng-blur="TodoList.doneEditing(todo)" todo-escape="TodoList.revert(todo)" todo-focus="todo === TodoList.editedTodo" class="edit"/>
				        </form>
				      </li>
				    </ul>
				  </section>
				  <footer ng-show="TodoList.todos.length &gt; 0" ng-cloak="ng-cloak" class="footer"><span class="todo-count"><strong>{{TodoList.nbRemaining}}&nbsp;</strong>
				      <ng-pluralize count="TodoList.nbRemaining" when="{ one: 'item left', other: 'items left' }"></ng-pluralize></span>
				    <ul class="filters">
				      <li><a ng-click="TodoList.setFilter('none')" ng-class="{selected: TodoList.statusFilter.completed === undefined}">All</a></li>
				      <li><a ng-click="TodoList.setFilter('active')" ng-class="{selected: TodoList.statusFilter.completed === false}">Active</a></li>
				      <li><a ng-click="TodoList.setFilter('completed')" ng-class="{selected: TodoList.statusFilter.completed === true}">Completed</a></li>
				    </ul>
				    <button id="clear-completed" ng-click="TodoList.clearCompletedTodos()" ng-show="TodoList.remainingCount &lt; TodoList.todos.length">Clear completed</button>
				  </footer>
				</section>`);
		}

	}
	TemplateRun.autodeclare('todomvc');
})()