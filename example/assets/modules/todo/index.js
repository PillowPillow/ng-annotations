import angular from 'npm/angular';

import storageConst from './constants/storage';
import todoRun from './runs/todos';
import storageService from './services/storage';
import todoFactory from './factories/todos';
import todoCtrl from './controllers/todolist';
import todolistDirective from './directives/todolist';
import todoEscapeDirective from './directives/todoEscape';
import todoFocusDirective from './directives/todoFocus';

const app = angular.module('todomvc', []);
export default app.name;

[
	storageConst,
	todoRun,
	storageService,
	todoFactory,
	todoCtrl,
	todolistDirective,
	todoEscapeDirective,
	todoFocusDirective
].forEach(component => component.declare(app));