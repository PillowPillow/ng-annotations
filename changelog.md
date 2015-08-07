## 0.1.6 (2015-08-07)

@Inject  
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
