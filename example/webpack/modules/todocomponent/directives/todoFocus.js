import {directive, inject} from 'src/app';
import {autobind} from 'src/app';

@directive('todoFocus')
@inject('$timeout')
export default class TodoFocus {
	ESCAPE_KEY = 27;
	restrict = 'A';

	constructor($timeout) {
		this.timeout = $timeout;
	}

	@autobind
	link($scope, $node, attrs) {
		$scope.$watch(attrs.todoFocus, (val) => val && this.timeout(() => $node[0].focus(), 0, false));
	}
}