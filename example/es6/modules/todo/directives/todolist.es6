(function() {
	const {directive} = ngAnnotations;

	@directive('todoList')
	class TodoList {
		restrict = 'EA';
		scope = {};
		controller = 'todoCtrl';
		controllerAs = 'TodoList';
		templateUrl = 'todolist.tpl';
	}
	TodoList.declare('todomvc');

})()

