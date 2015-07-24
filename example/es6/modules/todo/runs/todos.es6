(function() {
	const {run, inject} = ngAnnotations;

	@run()
	@inject('todosFactory')
	class TodoRun {

		constructor(todoFactory) {
			this._todoFactory = todoFactory;
			this.loadTodos();
		}

		loadTodos() {
			this._todoFactory.load();
		}

	}
	TodoRun.declare('todomvc');

})()

