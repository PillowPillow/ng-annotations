var NgAnnotations = {};

// components
NgAnnotations.controller = require('src/decorators/components/controller');
NgAnnotations.service = require('src/decorators/components/service');
NgAnnotations.animation = require('src/decorators/components/animation');
NgAnnotations.config = require('src/decorators/components/config');
NgAnnotations.directive = require('src/decorators/components/directive');
NgAnnotations.factory = require('src/decorators/components/factory');
NgAnnotations.filter = require('src/decorators/components/filter');
NgAnnotations.provider = require('src/decorators/components/provider');
NgAnnotations.run = require('src/decorators/components/run');

// wrappers
NgAnnotations.constant = require('src/wrappers/constant');
NgAnnotations.value = require('src/wrappers/value');

// utils
NgAnnotations.inject = require('src/decorators/utils/inject');
NgAnnotations.autobind = require('src/decorators/utils/autobind');
NgAnnotations.attach = require('src/decorators/utils/attach');

export default window.ngAnnotations = NgAnnotations;