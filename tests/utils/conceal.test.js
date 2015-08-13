import {FooFactory,BarService,FooBarController} from '../sandbox/utils/conceal';
import module from '../sandbox';
const {mock} = angular;

describe('@conceal', () => {

	var service, $scope, ctrlBuilder, controller, factory;
	beforeEach(mock.module(module));
	beforeEach(mock.inject([
		FooFactory.$name,
		BarService.$name,
		'$rootScope',
		'$controller',
		(fooFactory, barService, $rootScope, $controller) => {
			factory = fooFactory;
			service = barService;
			$scope = $rootScope.$new();
			ctrlBuilder = $controller;
			controller = $controller(FooBarController.$name, {$scope});
		}
	]));

	it('shouldn\'t expose the concealed properties', function() {
		expect(service.foo).to.be.undefined;
	})

})