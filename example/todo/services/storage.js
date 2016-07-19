import {service, inject} from 'lib/app';

import STORAGE_CONST from '../constants/storage';

@service()
@inject(STORAGE_CONST)
export default class TodoStorage {
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