import {run, inject} from 'src/app';

import {$name as todos} from '../factories/todos';

@run()
@inject(todos)
export default class TodoRun {

	constructor(todoFactory) {
		this._todoFactory = todoFactory;
		this.loadTodos();
	}

	loadTodos() {
		this._todoFactory.load();
	}

}
