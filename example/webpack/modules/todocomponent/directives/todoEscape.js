import {directive} from 'src/app';
import {autobind} from 'src/app';

@directive('todoEscape')
export default class TodoEscape {
	ESCAPE_KEY = 27;
	restrict = 'A';

	@autobind
	link($scope, $node, attrs) {
		$node.bind('keydown', event => event.keyCode === this.ESCAPE_KEY && $scope.$apply(attrs.todoEscape));
		$scope.$on('$destroy', () => $node.unbind('keydown'));
	}
}