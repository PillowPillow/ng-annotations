'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
	var _ngAnnotations = ngAnnotations;
	var service = _ngAnnotations.service;
	var inject = _ngAnnotations.inject;

	var TodoStorage = (function () {
		function TodoStorage(STORAGE_ID) {
			_classCallCheck(this, _TodoStorage);

			this.storageId = '';

			this.storageId = STORAGE_ID;
		}

		_createClass(TodoStorage, [{
			key: 'get',
			value: function get() {
				return JSON.parse(localStorage.getItem(this.storageId) || '[]');
			}
		}, {
			key: 'put',
			value: function put(todos) {
				localStorage.setItem(this.storageId, JSON.stringify(todos));
			}
		}]);

		var _TodoStorage = TodoStorage;
		TodoStorage = inject('storage-id')(TodoStorage) || TodoStorage;
		TodoStorage = service('todoStorage')(TodoStorage) || TodoStorage;
		return TodoStorage;
	})();

	TodoStorage.declare('todomvc');
})();
