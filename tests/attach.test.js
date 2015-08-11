import {Ctrl, SafeCtrl, Serv} from './sandbox/attach';
import module from './sandbox';
const {mock} = angular;

describe('Service', () => {

	var service, $scope, ctrlBuilder, controller;
	beforeEach(mock.module(module));
	beforeEach(mock.inject([
		Serv.$name,
		'$rootScope',
		'$controller',
		(serv, $rootScope, $controller) => {
			service = serv;
			$scope = $rootScope.$new();
			ctrlBuilder = $controller;
			controller = $controller(SafeCtrl.$name, {$scope});
		}
	]));

	it('should throw an error because the @inject is not applied', function() {
		expect(function() {
			controller = ctrlBuilder(Ctrl.$name, {$scope});
		}).to.throw(Error);
	})

	it('should bind the service datas to the controller ', function() {
		expect(controller.attachedData).to.not.be.undefined;
		expect(controller.attachedData).to.equal(service.datas);
	})

	it('should keep the context', function() {
		controller.attachedData.pop();
		expect(controller.getLength()).to.equal(service.getLength());
		service.datas.pop();
		expect(controller.getLength()).to.equal(service.getLength());
	})

	it(`shouldn't be affected by a reference erasing`, function() {
		let oldDatas = service.datas;
		service.clearReference();
		expect(oldDatas).to.not.equal(service.datas);
		expect(controller.attachedData).to.equal(service.datas);
	})

})