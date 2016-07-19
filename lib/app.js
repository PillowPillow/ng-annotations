import {NgAnimation} from './decorators/class/animation';
import {NgConfig} from './decorators/class/config';
import {NgController} from './decorators/class/controller';
import {NgDecorator} from './decorators/class/decorator';
import {NgDirective} from './decorators/class/directive';
import {NgFactory} from './decorators/class/factory';
import {NgFilter} from './decorators/class/filter';
import {NgProvider} from './decorators/class/provider';
import {NgRun} from './decorators/class/run';
import {NgService} from './decorators/class/service';

import {NgConstant} from './wrappers/constant';
import {NgValue} from './wrappers/value';

import {inject as NgAInject} from './decorators/mix/inject';

import {conceal as NgAConceal} from './decorators/attribute/conceal';
import {attach as NgAAttch} from './decorators/attribute/attach';
import {autobind as NgAAutobind} from './decorators/attribute/autobind';

var NG_ANNOTATIONS = {};

export const animation = NG_ANNOTATIONS.animation = NgAnimation;
export const Animation = NG_ANNOTATIONS.Animation = NgAnimation;

export const config = NG_ANNOTATIONS.config = NgConfig;
export const Config = NG_ANNOTATIONS.Config = NgConfig;

export const controller = NG_ANNOTATIONS.controller = NgController;
export const Controller = NG_ANNOTATIONS.Controller = NgController;

export const decorator = NG_ANNOTATIONS.decorator = NgDecorator;
export const Decorator = NG_ANNOTATIONS.Decorator = NgDecorator;

export const directive = NG_ANNOTATIONS.directive = NgDirective;
export const Directive = NG_ANNOTATIONS.Directive = NgDirective;

export const factory = NG_ANNOTATIONS.factory = NgFactory;
export const Factory = NG_ANNOTATIONS.Factory = NgFactory;

export const filter = NG_ANNOTATIONS.filter = NgFilter;
export const Filter = NG_ANNOTATIONS.Filter = NgFilter;

export const provider = NG_ANNOTATIONS.provider = NgProvider;
export const Provider = NG_ANNOTATIONS.Provider = NgProvider;

export const run = NG_ANNOTATIONS.run = NgRun;
export const Run = NG_ANNOTATIONS.Run = NgRun;

export const service = NG_ANNOTATIONS.service = NgService;
export const Service = NG_ANNOTATIONS.Service = NgService;

export const constant = NG_ANNOTATIONS.constant = NgConstant;
export const Constant = NG_ANNOTATIONS.Constant = NgConstant;

export const value = NG_ANNOTATIONS.value = NgValue;
export const Value = NG_ANNOTATIONS.Value = NgValue;

export const inject = NG_ANNOTATIONS.inject = NgAInject;
export const Inject = NG_ANNOTATIONS.Inject = NgAInject;

export const attach = NG_ANNOTATIONS.attach = NgAAttch;
export const Attach = NG_ANNOTATIONS.Attach = NgAAttch;

export const Conceal = NG_ANNOTATIONS.Conceal = NgAConceal;
export const conceal = NG_ANNOTATIONS.conceal = NgAConceal;

export const Autobind = NG_ANNOTATIONS.Autobind = NgAAutobind;
export const autobind = NG_ANNOTATIONS.autobind = NgAAutobind;

global.ngAnnotations = NG_ANNOTATIONS;
