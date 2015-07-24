(function() {
	const {service, inject} = ngAnnotations;

	@service('todoStorage')
	@inject('storage-id')
	class TodoStorage {
		storageId = '';

		constructor(STORAGE_ID) {
			this.storageId = STORAGE_ID;
		}

		get() {
			return JSON.parse(localStorage.getItem(this.storageId) || '[]');
		}

		put(todos) {
			localStorage.setItem(this.storageId, JSON.stringify(todos));
		}
	}
	TodoStorage.autodeclare('todomvc');

})()