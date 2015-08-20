## 0.1.11 (2015-08-20)

Bugfix:  
* @filter

> now supports the stateful filters  

````
import {filter, inject} from 'node_modules/ng-annotations';

@filter('statefulFilter')
@inject('someDependency')
class StatefulFilter {
	$stateful = true;
	$filter(input) {
		return input; //do something with the dependency
	}
}

````

## 0.1.10 (2015-08-14)

@conceal: [new feature]
> the conceal decorator is now available.  
> it provides a way to declare the class members as private.

````javascript
import {factory, inject, conceal} from 'node_modules/ng-annotations';

@factory()
@inject('$http')
class MyFactory {
	@conceal
	@attach('$http')
	$http
	
	@conceal
	datas = [];
	
	getDatas() {
		return this.datas;
	}
}


import {service, inject} from 'node_modules/ng-annotations';

@service()
@inject(MyFactory)
class MyService {

	constructor(myFactory) {
		myFactory.$http; // not defined
		myFactory.datas; // not defined
		myFactory.getDatas; // defined
	}

}


````

## 0.1.9 (2015-08-12)

Bugfix:
* @attach  

> now supports correctly the bindings without second parameter  

````javascript
import {controller, inject} from 'node_modules/ng-annotations';
import MyFactory from './myFactory';

@controller()
@inject(MyFactory)
export default class MyCtrl {
	@attach(MyFactory)
	factory;
}
````

## 0.1.8 (2015-08-12)

Bugfix:
* @inject  

> now injects correctly the dependencies with the services and providers components

## 0.1.7 (2015-08-11)

@attach  [new feature]
> the attach decorator is now available.  
> it provides a shortcut to bind references across components.

Specs:
* binds datas accross components
* not affected by the reference erasing
* keeps the execution context ( autobind like )

````javascript
import {factory, inject} from 'node_modules/ng-annotations';

@factory()
@inject('$http')
class MyFactory {
	this.datas = [];
	load() {
		this.$http.get('...').success(dataList => this.datas = dataList)
	}
}
````

*before*  
````javascript
import {controller, inject} from 'node_modules/ng-annotations';
import MyFactory from './myFactory';

@controller()
@inject(MyFactory)
export default class MyCtrl {
	constructor(factory) {
		this.factory = factory;
	}
	
	get datas() {
		// thanks to the accessor, you didn't care about reference erasing
		return this.factory.datas;
	}
	set datas(val) {
		this.factory.datas = val;
	}
}
````

*after*  
````javascript
import {controller, inject} from 'node_modules/ng-annotations';
import MyFactory from './myFactory';

@controller()
@inject(MyFactory)
export default class MyCtrl {	
	@attach(MyFactory, 'datas')
	datas;
}
````

---

Breaking changes:

* @factory  

> in order to decrease the namming issues, the `expose` method is no longer supported.  
> use $expose instead.

*before*
````javascript
import {factory, autobind} from 'node_modules/ng-annotations';

@factory()
export default class MyFactory {
	items;

	@autobind
	get() { return this.items; }
	
	@autobind
	load(list = []) { this.items = list; }

	expose() {
		return { load: this.load, get: this.get	}
	}
}
````

*after*
````javascript
import {factory, autobind} from 'node_modules/ng-annotations';

@factory()
export default class MyFactory {
	items;

	@autobind
	get() { return this.items; }
	
	@autobind
	load(list = []) { this.items = list; }

	$expose() {
		return { load: this.load, get: this.get	}
	}
}
````

## 0.1.6 (2015-08-07)

@inject  
> Now supports the annotated component injections.  
> You no longer need to extract the name property to inject a component.

*before*  
````javascript
import {controller, inject} from 'node_modules/ng-annotations';
import {$name as yourService} from '../myservice.js';

@controller()
@inject(yourService)
export default class MyCtrl {
	constructor(yourserv) {
		/*do something*/
	}
}
````

*after*  
````javascript
import {controller, inject} from 'node_modules/ng-annotations';
import yourService from '../myservice.js';

@controller()
@inject(yourService)
export default class MyCtrl {
	constructor(yourserv) {
		/*do something*/
	}
}
````
