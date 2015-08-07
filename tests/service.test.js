import {FooBarService, BarFooService, BarBarService} from './sandbox/service';
import module from './sandbox';
const {mock} = angular;

describe('Service', () => {

	var foobar, barfoo, barbar;
	beforeEach(mock.module(module));
	beforeEach(mock.inject([
		FooBarService.$name,
		BarFooService.$name,
		BarBarService.$name,
		(FooBarService, BarFooService, BarBarService) => {
			foobar = FooBarService;
			barfoo = BarFooService;
			barbar = BarBarService;
		}
	]));

	it('should have a different name', () => {
		expect(BarFooService.$name).to.equal('renamed.service.barfoo');
		expect(barfoo).to.not.be.undefined;
	})

	it('should keep the context', () => {
		expect(foobar.get()).to.equal(foobar);
		expect(barfoo.get()).to.equal(barfoo);
	})

	it('should inject an other service', () => {
		expect(barbar.barfoo).to.equal(barfoo);
		expect(barbar.barfoo).to.equal(barfoo);
	})

})