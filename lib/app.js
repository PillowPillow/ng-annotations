import {NgController} from './decorators/class/controller';

var NG_ANNOTATIONS = {};
NG_ANNOTATIONS.controller = NG_ANNOTATIONS.Controller = NgController;

export default global.ngAnnotations = NG_ANNOTATIONS;