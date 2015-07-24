import {directive} from 'src/app';

import {$name as todolistCtrl} from '../controllers/todolist';
import tplRenderer from '../templates/todolist.jade';

@directive('todoList')
export default class TodoList {
	restrict = 'EA';
	scope = {};
	controller = todolistCtrl;
	controllerAs = 'TodoList';
	template = tplRenderer();
}