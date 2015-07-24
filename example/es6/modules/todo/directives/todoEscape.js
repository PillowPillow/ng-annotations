'use strict';

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
	var _ngAnnotations = ngAnnotations;
	var directive = _ngAnnotations.directive;
	var autobind = _ngAnnotations.autobind;

	var TodoEscape = (function () {
		function TodoEscape() {
			_classCallCheck(this, _TodoEscape);

			this.ESCAPE_KEY = 27;
			this.restrict = 'A';
		}

		_createDecoratedClass(TodoEscape, [{
			key: 'link',
			decorators: [autobind],
			value: function link($scope, $node, attrs) {
				var _this = this;

				$node.bind('keydown', function (event) {
					return event.keyCode === _this.ESCAPE_KEY && $scope.$apply(attrs.todoEscape);
				});
				$scope.$on('$destroy', function () {
					return $node.unbind('keydown');
				});
			}
		}]);

		var _TodoEscape = TodoEscape;
		TodoEscape = directive('todoEscape')(TodoEscape) || TodoEscape;
		return TodoEscape;
	})();

	TodoEscape.declare('todomvc');
})();
