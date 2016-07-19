import {directive} from 'lib/app';

// can be simplified by using https://www.npmjs.com/package/babel-plugin-add-module-exports
import {default as todolistCtrl} from '../controllers/todolist';
// import {$name as todolistCtrl} from '../controllers/todolist';
import tplRenderer from '../templates/todolist.jade';

@directive('todoList')
export default class TodoList {
	restrict = 'EA';
	scope = {};
	controller = todolistCtrl.$name;
	controllerAs = 'TodoList';
	template = tplRenderer();
}