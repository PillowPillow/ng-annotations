(function() {
	const {directive, autobind} = ngAnnotations;

	@directive('todoEscape')
	class TodoEscape {
		ESCAPE_KEY = 27;
		restrict = 'A';

		@autobind
		link($scope, $node, attrs) {
			$node.bind('keydown', event => event.keyCode === this.ESCAPE_KEY && $scope.$apply(attrs.todoEscape));
			$scope.$on('$destroy', () => $node.unbind('keydown'));
		}
	}
	TodoEscape.declare('todomvc');

})()

