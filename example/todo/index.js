import angular from 'angular';

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


//app.constant(storageConst.$name, storageConst.$component);
//app.run(todoRun.$component);
//app.service(storageService.$name, storageService.$component);
//app.factory(todoFactory.$name, todoFactory.$component);
//app.controller(todoCtrl.$name, todoCtrl.$component);
//app.directive(todolistDirective.$name, todolistDirective.$component);
//app.directive(todoEscapeDirective.$name, todoEscapeDirective.$component);
//app.directive(todoFocusDirective.$name, todoFocusDirective.$component);

[
	storageConst,
	todoRun,
	storageService,
	todoFactory,
	todoCtrl,
	todolistDirective,
	todoEscapeDirective,
	todoFocusDirective
].forEach(component => component.autodeclare(app));