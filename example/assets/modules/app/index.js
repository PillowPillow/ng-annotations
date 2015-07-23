import {controller, inject} from 'src/app';


const app = angular.module('todomvc', []);
export default app.name;

app.service('foobar', function() {})

@controller()
@inject('foobar')
class MyCtrl {
	construct(service) {
		console.log(service);
	}
}

console.log(MyCtrl.$inject)
